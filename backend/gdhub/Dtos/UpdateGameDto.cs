namespace gdhub.Dtos;

public record UpdateGameDto
(
    string Name,
    string Owner,
    float Rating,
    string PicUrl,
    string Summary,
    string Details
);