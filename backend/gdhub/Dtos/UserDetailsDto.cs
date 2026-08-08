namespace gdhub.Dtos;

using gdhub.Enum;

public record UserDetailsDto
(
    int Id,
    string Email,
    UserRank Rank,
    int Exp,
    Dictionary<string, int> GameRecords
);