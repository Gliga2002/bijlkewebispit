namespace Biljke.Models;

public class Context : DbContext
{
    public required DbSet<Biljka> Biljke { get; set; }
    public required DbSet<Podrucje> Podrucja { get; set; }
    public required DbSet<Vidjenja> Vidjenja { get; set; }
    public required DbSet<Osobina> Osobine { get; set; }
    public required DbSet<NepoznataBiljka> NepoznateBiljke { get; set; }

    public Context(DbContextOptions options) : base(options)
    {

    }
}
