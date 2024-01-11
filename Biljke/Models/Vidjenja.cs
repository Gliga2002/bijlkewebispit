namespace Biljke.Models;

public class Vidjenja
{
    [Key]
    public int ID { get; set; }
    [Range(-90, 90)]
    public double Latitude { get; set; }
    [Range(-180, 180)]
    public double Longitude { get; set; }
    public DateTime DatumIVreme { get; set; }
    [JsonIgnore]
    public Biljka? Biljka { get; set; }
    public Podrucje? Podrucje { get; set; }
}
