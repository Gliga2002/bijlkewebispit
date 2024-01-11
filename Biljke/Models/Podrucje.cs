namespace Biljke.Models;

public class Podrucje
{
    [Key]
    public int ID { get; set; }
    [MaxLength(100)]
    public required string Naziv { get; set; }
    [JsonIgnore]
    public List<Vidjenja>? Videnja { get; set; }
}
