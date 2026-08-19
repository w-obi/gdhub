namespace gdhub.Models;

public class Game
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Owner { get; set; }
    public int Rating { get; set; }
    public required string PicUrl { get; set; }
    public required string Summary { get; set; }
    public required string Details { get; set; }
}