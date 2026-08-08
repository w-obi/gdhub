namespace gdhub.Dtos;

using gdhub.Enum;

public record UserSummaryDto
(
    int Id,
    string Email,
    UserRank Rank,
    int Exp
);