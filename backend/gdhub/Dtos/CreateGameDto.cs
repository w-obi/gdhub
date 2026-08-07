namespace gdhub.Dtos;

public record CreateGameDto
(
    string Name,
    int Rating,
    string Summary,
    string Details
);