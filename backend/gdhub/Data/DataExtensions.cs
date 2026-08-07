using Microsoft.EntityFrameworkCore;

namespace gdhub.Data;

public static class DataExtensions
{
    public static void MigrateDb(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<gdhubContext>();
        dbContext.Database.Migrate();
    }

    public static void AddgdhubContext(this WebApplicationBuilder builder)
    {
        var connstr = builder.Configuration.GetConnectionString("gdhub");

        builder.Services.AddDbContext<gdhubContext>(options =>
            options.UseNpgsql(connstr)
        );
    }
}