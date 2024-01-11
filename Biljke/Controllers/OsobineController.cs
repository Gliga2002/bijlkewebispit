namespace Biljke.Controllers;

[ApiController]
[Route("[controller]")]
public class OsobineController : ControllerBase
{
    public Context Context { get; set; }

    public OsobineController(Context context)
    {
        Context = context;
    }

    [HttpGet("PreuzmiOsobine")]
    public async Task<ActionResult> PreuzmiOsobine()
    {
        try
        {
            var osobine = await Context.Osobine.ToListAsync();
            return Ok(osobine);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("UpisiOsobinu")]
    public async Task<ActionResult> UpisiOsobinu([FromBody]Osobina osobina)
    {
        try
        {
            await Context.Osobine.AddAsync(osobina);
            await Context.SaveChangesAsync();
            return Ok($"Uspešno upisana osobina sa ID: {osobina.ID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("IzmeniOsobinu/{id}")]
    public async Task<ActionResult> IzmeniOsobinu(int id, [FromBody]Osobina osobina)
    {
        try
        {
            var osobinaIzBaze = await Context.Osobine.FindAsync(id);

            if (osobinaIzBaze != null)
            {
                osobinaIzBaze.Naziv = osobina.Naziv;
                osobinaIzBaze.Vrednost = osobina.Vrednost;
                Context.Osobine.Update(osobinaIzBaze);
                await Context.SaveChangesAsync();
                return Ok($"Izvršen je update osobine sa ID: {id}");
            }
            else
            {
                return NotFound($"Osobina sa ID: {id} nije pronađena u bazi podataka.");
            }
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("IzbrisiOsobinu/{id}")]
    public async Task<ActionResult> Izbrisati(int id)
    {
        try
        {
            var osobina = await Context.Osobine.FindAsync(id);

            if (osobina != null)
            {
                Context.Osobine.Remove(osobina);
                await Context.SaveChangesAsync();
                return Ok($"Osobina sa ID: {id} je izbrisana iz baze podataka.");
            }
            else
            {
                return NotFound($"Nije pronađena osobina sa ID: {id}");
            }
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}
