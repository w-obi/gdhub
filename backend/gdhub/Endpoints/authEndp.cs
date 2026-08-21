using Google.Apis.Auth;
using Microsoft.EntityFrameworkCore;
using gdhub.Data;
using gdhub.Models;
using gdhub.Enum;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/auth");

        group.MapPost("/google", async (GoogleLoginDto request, gdhubContext db, IConfiguration config) =>
        {
            try
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(request.AccessToken);

                var user = await db.Users.FirstOrDefaultAsync(u => u.Email == payload.Email);

                if (user == null)
                {
                    user = new User
                    {
                        Email = payload.Email,
                        Rank = UserRank.Padawan,
                        Exp = 0,
                        GameRecords = new Dictionary<string, int>(),
                        Role = "User"
                    };

                    db.Users.Add(user);
                    await db.SaveChangesAsync();
                }

                var jwtToken = GenerateJwtToken(user, config);

                return Results.Ok(new
                {
                    Token = jwtToken,
                    Role = user.Role
                });
            }
            catch (InvalidJwtException)
            {
                return Results.Unauthorized();
            }
        });
    }

    private static string GenerateJwtToken(User user, IConfiguration config)
    {
        var secretKey = config["Jwt:Key"];
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
        new Claim(JwtRegisteredClaimNames.Sub, user.Email),
        new Claim(ClaimTypes.Role, user.Role),
        new Claim("userId", user.Id.ToString())
    };

        var token = new JwtSecurityToken(
            issuer: config["Jwt:Issuer"],
            audience: config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

}

public class GoogleLoginDto
{
    public required string AccessToken { get; set; }
}