using Microsoft.EntityFrameworkCore;
using gdhub.Models;

namespace gdhub.Data;

public static class DataExtensions
{
    public static void MigrateDb(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<gdhubContext>();
        dbContext.Database.Migrate();

        if (!dbContext.Games.Any())
        {
            dbContext.Games.AddRange(
                new Game
                {
                    Name = "meat",
                    Owner = "meatcorp",
                    Rating = 4.43f,
                    PicUrl = "",
                    Summary = "good if you want some meat and blood",
                    Details = "what do you want to hear lol, it is for crazy"
                },
                new Game
                {
                    Name = "bone",
                    Owner = "bonecorp",
                    Rating = 3.33f,
                    PicUrl = "",
                    Summary = "good if you want some bones and blood",
                    Details = "what do you want to hear lol, it is for crazy gng"
                },
                new Game
                {
                    Name = "sugar",
                    Owner = "sugarcorp",
                    Rating = 2.22f,
                    PicUrl = "",
                    Summary = "good if you want some sweets and sugar",
                    Details = "what do you want to hear lol, it is for lucky gng"
                },
                new Game
                {
                    Name = "hope",
                    Owner = "hopecorp",
                    Rating = 0.11f,
                    PicUrl = "",
                    Summary = "good if you are desperate",
                    Details = "what do you want to hear lol, it is for loses"
                },
                new Game
                {
                    Name = "dream",
                    Owner = "dreamcorp",
                    Rating = 5.00f,
                    PicUrl = "",
                    Summary = "good if you want some bones and blood in your journey for dream",
                    Details = "what do you want to hear lol, it is Griffith's stuff"
                },
                new Game
                {
                    Name = "void",
                    Owner = "voidcorp",
                    Rating = 4.44f,
                    PicUrl = "",
                    Summary = "good if you are bored",
                    Details = "what do you want to hear lol, it is for bored people"
                }
            );
        }

        if (!dbContext.Users.Any())
        {
            dbContext.Users.AddRange(
                new User
                {
                    Email = "admin@gdhub.com",
                    Rank = gdhub.Enum.UserRank.Master,
                    Exp = 9999,
                    GameRecords = new Dictionary<string, int>(),
                    Role = "Admin"
                },
                new User
                {
                    Email = "noobmaster@gdhub.com",
                    Rank = gdhub.Enum.UserRank.Padawan,
                    Exp = 0,
                    GameRecords = new Dictionary<string, int>(),
                    Role = "User"
                }
            );
        }
    }

    public static void AddgdhubContext(this WebApplicationBuilder builder)
    {
        var connstr = builder.Configuration.GetConnectionString("gdhub");

        builder.Services.AddDbContext<gdhubContext>(options =>
            options.UseNpgsql(connstr)
        );
    }
}