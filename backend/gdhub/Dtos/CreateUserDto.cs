namespace gdhub.Dtos;

using gdhub.Enum;

public record CreateUserDto
(
    string Email,
    UserRank Rank,
    int Exp,
    Dictionary<string, int> GameRecords,
    string Role
);