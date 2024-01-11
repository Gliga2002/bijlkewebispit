namespace Biljke.Models;

public class Osobina
{
    [Key]
    public int ID { get; set; }
    [MaxLength(100)]
    public string? Naziv { get; set; }
    [MaxLength(100)]
    public string? Vrednost { get; set; }
    [JsonIgnore]
    public List<Biljka>? Biljke { get; set; }
    public List<NepoznataBiljka>? NepoznateBiljke { get; set; }
}
