namespace gdhub.Dtos;

public record CreateUserDto
(
    string Email,
    int Rank,
    int Exp,
    Dictionary<string, int> GameRecords
);