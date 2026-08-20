namespace gdhub.Dtos;

public record GameSummaryDto
(
    int Id,
    string Name,
    string Owner,
    float Rating,
    string PicUrl,
    string Summary
);