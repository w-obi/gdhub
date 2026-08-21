using Microsoft.EntityFrameworkCore;
using gdhub.Models;
using gdhub.Enum;

namespace gdhub.Data;

public static class DataExtensions
{
    public static void MigrateDb(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<gdhubContext>();
        dbContext.Database.Migrate();

        dbContext.Games.AddRange(
            new Game
            {
                Name = "meat",
                Owner = "meatcorp",
                Rating = 4.43f,
                PicUrl = "https://i.pinimg.com/736x/78/f1/bd/78f1bd380b559a21cc71348c6fe7bb23.jpg",
                Summary = "good if you want some meat and blood",
                Details = "what do you want to hear lol, it is for crazy"
            },
            new Game
            {
                Name = "bone",
                Owner = "bonecorp",
                Rating = 3.33f,
                PicUrl = "https://i.pinimg.com/1200x/3f/1f/85/3f1f854ef4a6bf8fdaa7b06e6c0f8774.jpg",
                Summary = "good if you want some bones and blood",
                Details = "what do you want to hear lol, it is for crazy gng"
            },
            new Game
            {
                Name = "sugar",
                Owner = "sugarcorp",
                Rating = 2.22f,
                PicUrl = "https://i.pinimg.com/1200x/45/21/22/4521228b70eb682365c26045c751e580.jpg",
                Summary = "good if you want some sweets and sugar",
                Details = "what do you want to hear lol, it is for lucky gng"
            },
            new Game
            {
                Name = "hope",
                Owner = "hopecorp",
                Rating = 0.11f,
                PicUrl = "https://i.pinimg.com/1200x/94/8f/31/948f319313246a479439cc027670f54f.jpg",
                Summary = "good if you are desperate",
                Details = "what do you want to hear lol, it is for loses"
            },
            new Game
            {
                Name = "dream",
                Owner = "dreamcorp",
                Rating = 5.00f,
                PicUrl = "https://i.pinimg.com/1200x/1c/b0/03/1cb003ec3e781c71eb447d6c603ed0c3.jpg",
                Summary = "good if you want some bones and blood in your journey for dream",
                Details = "what do you want to hear lol, it is Griffith's stuff"
            },
            new Game
            {
                Name = "void",
                Owner = "voidcorp",
                Rating = 4.44f,
                PicUrl = "https://i.pinimg.com/736x/38/cd/7e/38cd7e75ae18d5923b7394c25124cfe3.jpg",
                Summary = "good if you are bored",
                Details = "what do you want to hear lol, it is for bored people"
            }
        );

        dbContext.Users.AddRange(
            new User
            {
                Email = "eradillov04@gmail.com",
                Rank = UserRank.Master,
                Exp = 9999,
                GameRecords = new Dictionary<string, int>(),
                Role = "Admin"
            }
        );
        Console.WriteLine("aaaaaaaaaaaaaaaaaaa");
        dbContext.SaveChanges();
    }

    public static void AddgdhubContext(this WebApplicationBuilder builder)
    {
        var connstr = builder.Configuration.GetConnectionString("gdhub");

        builder.Services.AddDbContext<gdhubContext>(options =>
            options.UseNpgsql(connstr)
        );
    }
}