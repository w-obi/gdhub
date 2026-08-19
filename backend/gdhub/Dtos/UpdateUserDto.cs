namespace gdhub.Dtos;

using gdhub.Enum;

public record UpdateUserDto
(
    string Email,
    UserRank Rank,
    int Exp,
    Dictionary<string, int> GameRecords,
    string Role
);