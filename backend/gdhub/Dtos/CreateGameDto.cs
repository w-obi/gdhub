namespace gdhub.Dtos;

public record CreateGameDto
(
    string Name,
    string Owner,
    int Rating,
    string PicUrl,
    string Summary,
    string Details
);