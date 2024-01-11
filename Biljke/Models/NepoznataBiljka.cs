namespace Biljke.Models;

public class NepoznataBiljka
{
    [Key]
    public int ID { get; set; }
    public List<Osobina>? Osobine { get; set; }
}
