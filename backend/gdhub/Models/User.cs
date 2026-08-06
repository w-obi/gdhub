namespace gdhub.Models;

using System.Text.Json.Serialization;

public enum UserRank
{
    Padawan,
    Knight,
    Master
}

public class User
{
    public int Id { get; set; }
    public required string Email { get; set; }

    // This tells .NET API to send "Padawan" to React instead of 0
    [JsonConverter(typeof(JsonStringEnumConverter))]

    public required UserRank Rank { get; set; }
    public required int Exp { get; set; }
    public Dictionary<string, int> GameRecords { get; set; } =
        new Dictionary<string, int>();
}


// (If you are using Entity Framework to talk to your database):
// To make your database save the word "Padawan" instead of 0, go to your
// AppDbContext.cs file and add this to the OnModelCreating method:

// protected override void OnModelCreating(ModelBuilder modelBuilder)
// {
//     modelBuilder.Entity<User>()
//         .Property(u => u.Rank)
//         .HasConversion<string>(); // Tells the database to save it as Text!
// }