using gdhub.Dtos;
using gdhub.Models;
using gdhub.Data;
using Microsoft.EntityFrameworkCore;

namespace gdhub.Endpoints;

public static class adminEndpoints
{
    const string adminEndpoint = "GetUsers";

    public static void MapMiniadminEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/admin");

        group.MapGet("/", async (gdhubContext dbContext) => await dbContext.Users
        .Include(user => user)
        .Select(user => new UserSummaryDto(
            user.Id,
            user.Email,
            user.Rank,
            user.Exp
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
                    user.GameRecords
                )
            );
        });

        group.MapPost("/", async (CreateUserDto newUser, gdhubContext dbContext) =>
        {
            User user = new()
            {
                Email = newUser.Email,
                Rank = newUser.Rank,
                Exp = newUser.Exp,
                GameRecords = newUser.GameRecords
            };

            dbContext.Users.Add(user);
            await dbContext.SaveChangesAsync();

            UserDetailsDto userDto = new(
                    user.Id,
                    user.Name,
                    user.Rank,
                    user.Exp,
                    user.GameRecords
            );

            return Results.CreatedAtRoute(adminEndpoint, new { id = user.Id }, userDto);
        });

        group.MapPut("/{id}", async (int id, UpdateUserDto updated, gdhubContext dbContext) =>
        {
            var existingUser = await dbContext.Users.FindAsync(id);

            if (existingUser is null) return Results.NotFound();

            existingUser.Name = updated.Name;
            existingUser.Rank = updated.Rank;
            existingUser.Exp = updated.Exp;
            existingUser.GameRecords = updated.GameRecords;

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