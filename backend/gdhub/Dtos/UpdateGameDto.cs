namespace gdhub.Dtos;

public record UpdateGameDto
(
    string Name,
    string Owner,
    int Rating,
    string PicUrl,
    string Summary,
    string Details
);