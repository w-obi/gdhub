namespace gdhub.Dtos;

public record UpdateUserDto
(
    string Email,
    int Rank,
    int Exp,
    Dictionary<string, int> GameRecords
);