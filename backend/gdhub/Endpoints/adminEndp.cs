using gdhub.Dtos;
using gdhub.Models;
using gdhub.Data;
using Microsoft.EntityFrameworkCore;

namespace gdhub.Endpoints;

public static class adminEndpoints
{
    const string adminEndpoint = "GetUsers";
    const string getUserDetailsEndpoint = "GetUser";

    public static void MapAdminEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/admin");

        group.MapGet("/", async (gdhubContext dbContext) => await dbContext.Users
        .Select(user => new UserSummaryDto(
            user.Id,
            user.Email,
            user.Rank,
            user.Exp,
            user.Role
        )).AsNoTracking().ToListAsync()).WithName(adminEndpoint);

        group.MapGet("/{id}", async (int id, gdhubContext dbContext) =>
        {
            var user = await dbContext.Users.FindAsync(id);
            return user is null ? Results.NotFound() : Results.Ok(
                    new UserDetailsDto(
                    user.Id,
                    user.Email,
                    user.Rank,
                    user.Exp,
                    user.GameRecords,
                    user.Role
                )
            );
        }).WithName(getUserDetailsEndpoint);

        group.MapPost("/", async (CreateUserDto newUser, gdhubContext dbContext) =>
        {
            User user = new()
            {
                Email = newUser.Email,
                Rank = newUser.Rank,
                Exp = newUser.Exp,
                GameRecords = newUser.GameRecords,
                Role = newUser.Role
            };

            dbContext.Users.Add(user);
            await dbContext.SaveChangesAsync();

            UserDetailsDto userDto = new(
                    user.Id,
                    user.Email,
                    user.Rank,
                    user.Exp,
                    user.GameRecords,
                    user.Role
            );

            return Results.CreatedAtRoute(getUserDetailsEndpoint, new { id = user.Id }, userDto);
        });

        group.MapPut("/{id}", async (int id, UpdateUserDto updated, gdhubContext dbContext) =>
        {
            var existingUser = await dbContext.Users.FindAsync(id);

            if (existingUser is null) return Results.NotFound();

            existingUser.Email = updated.Email;
            existingUser.Rank = updated.Rank;
            existingUser.Exp = updated.Exp;
            existingUser.GameRecords = updated.GameRecords;
            existingUser.Role = updated.Role;

            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        });

        group.MapDelete("/{id}", async (int id, gdhubContext dbContext) =>
        {
            await dbContext.Users.Where(game => game.Id == id).ExecuteDeleteAsync();
            return Results.NoContent();
        });
    }
}