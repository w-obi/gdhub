namespace gdhub.Dtos;

public record GameDetailsDto
(
    int Id,
    string Name,
    string Owner,
    float Rating,
    string PicUrl,
    string Details
);