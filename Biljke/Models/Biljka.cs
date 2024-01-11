namespace Biljke.Models;

public class Biljka
{
    [Key]
    public int ID { get; set; }
    [MaxLength(100)]
    public required string Naziv { get; set; }
    [MaxLength(100)]
    public string? Slika { get; set; }
    public List<Osobina>? Osobine { get; set; }
    public List<Vidjenja>? Videnja { get; set; }
}
