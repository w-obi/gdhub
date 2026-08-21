namespace gdhub.Models;

using gdhub.Enum;
using System.Text.Json.Serialization;

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

    public required string Role { get; set; }
}
