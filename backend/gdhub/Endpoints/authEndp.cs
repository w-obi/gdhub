using Google.Apis.Auth;
using Microsoft.EntityFrameworkCore;
using gdhub.Data;
using gdhub.Models;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/auth");

        group.MapPost("/google", async (GoogleLoginDto request, gdhubContext db) =>
        {
            try
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(request.AccessToken);

                var existingUser = await db.Users.FirstOrDefaultAsync(u => u.Email == payload.Email);

                if (existingUser != null)
                {
                    return Results.Ok(existingUser);
                }
                else
                {
                    var newUser = new User
                    {
                        Email = payload.Email,
                        Rank = gdhub.Enum.UserRank.Padawan,
                        Exp = 0,
                        GameRecords = new Dictionary<string, int>()
                    };

                    db.Users.Add(newUser);
                    await db.SaveChangesAsync();

                    return Results.Ok(newUser);
                }
            }
            catch (InvalidJwtException)
            {
                return Results.Unauthorized();
            }
        });
    }
}

public class GoogleLoginDto
{
    public required string AccessToken { get; set; }
}