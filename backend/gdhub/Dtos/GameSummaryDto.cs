namespace gdhub.Dtos;

public record GameSummaryDto
(
    int Id,
    string Name,
    string Owner,
    int Rating,
    string PicUrl,
    string Summary
);