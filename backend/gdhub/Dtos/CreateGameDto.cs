namespace gdhub.Dtos;

public record CreateGameDto
(
    string Name,
    string Owner,
    float Rating,
    string PicUrl,
    string Summary,
    string Details
);