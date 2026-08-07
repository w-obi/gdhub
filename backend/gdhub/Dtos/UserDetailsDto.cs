namespace gdhub.Dtos;

public record UserDetailsDto
(
    int Id,
    string Email,
    int Rank,
    int Exp,
    Dictionary<string, int> GameRecords
);