using gdhub.Dtos;
using gdhub.Models;
using gdhub.Data;
using Microsoft.EntityFrameworkCore;

namespace gdhub.Endpoints;

public static class gameEndpoints
{
    const string gameEndpoint = "GetGame";
    const string getGameDetailsEndpoint = "GetGameDetails";

    public static void MapGameEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/games");

        group.MapGet("/", async (gdhubContext dbContext) => await dbContext.Games
        .Select(game => new GameSummaryDto(
            game.Id,
            game.Name,
            game.Owner,
            game.Rating,
            game.PicUrl,
            game.Summary
        )).AsNoTracking().ToListAsync()).WithName(gameEndpoint);

        group.MapGet("/{id}", async (int id, gdhubContext dbContext) =>
        {
            var game = await dbContext.Games.FindAsync(id);
            return game is null ? Results.NotFound() : Results.Ok(
                    new GameDetailsDto(
                    game.Id,
                    game.Name,
                    game.Owner,
                    game.Rating,
                    game.PicUrl,
                    game.Details
                )
            );
        }).WithName(getGameDetailsEndpoint);

        group.MapPost("/", async (CreateGameDto newGame, gdhubContext dbContext) =>
        {
            Game game = new()
            {
                Name = newGame.Name,
                Owner = newGame.Owner,
                Rating = newGame.Rating,
                PicUrl = newGame.PicUrl,
                Summary = newGame.Summary,
                Details = newGame.Details
            };

            dbContext.Games.Add(game);
            await dbContext.SaveChangesAsync();

            GameDetailsDto gameDto = new(
                    game.Id,
                    game.Name,
                    game.Owner,
                    game.Rating,
                    game.PicUrl,
                    game.Details
            );

            return Results.CreatedAtRoute(getGameDetailsEndpoint, new { id = game.Id }, gameDto);
        });

        group.MapPut("/{id}", async (int id, UpdateGameDto updated, gdhubContext dbContext) =>
        {
            var existingGame = await dbContext.Games.FindAsync(id);

            if (existingGame is null) return Results.NotFound();

            existingGame.Name = updated.Name;
            existingGame.Owner = updated.Owner;
            existingGame.Rating = updated.Rating;
            existingGame.PicUrl = updated.PicUrl;
            existingGame.Summary = updated.Summary;
            existingGame.Details = updated.Details;

            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        });

        group.MapDelete("/{id}", async (int id, gdhubContext dbContext) =>
        {
            await dbContext.Games.Where(game => game.Id == id).ExecuteDeleteAsync();
            return Results.NoContent();
        });
    }
}