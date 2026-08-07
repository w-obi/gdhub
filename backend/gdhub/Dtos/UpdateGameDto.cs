namespace gdhub.Dtos;

public record UpdateGameDto
(
    string Name,
    int Rating,
    string Summary,
    string Details
);