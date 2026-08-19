namespace gdhub.Dtos;

public record GameDetailsDto
(
    int Id,
    string Name,
    string Owner,
    int Rating,
    string PicUrl,
    string Details
);