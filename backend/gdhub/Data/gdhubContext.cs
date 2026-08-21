using Microsoft.EntityFrameworkCore;
using gdhub.Models;
using System.Text.Json;

namespace gdhub.Data;

public class gdhubContext(DbContextOptions<gdhubContext> options) : DbContext(options)
{
    public DbSet<Game> Games => Set<Game>();
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .Property(u => u.Rank)
            .HasConversion<string>(); // Tells the database to save it as Text

        modelBuilder.Entity<User>()
            .Property(u => u.GameRecords)
            .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<Dictionary<string, int>>(v, (JsonSerializerOptions?)null) ?? new Dictionary<string, int>()
            ).HasColumnType("jsonb"); ;
    }
}