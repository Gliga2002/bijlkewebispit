namespace Biljke.Controllers;

[ApiController]
[Route("[controller]")]
public class PodrucjaController : ControllerBase
{
    public Context Context { get; set; }

    public PodrucjaController(Context context)
    {
        Context = context;
    }

    [HttpGet("PreuzmiPodrcuja")]
    public async Task<ActionResult> PreuzmiPodrucja()
    {
        try
        {
            var podrucja = await Context.Podrucja.Select(p => new
            {
                Identifikator = p.ID,
                p.Naziv
            }).ToListAsync();
            return Ok(podrucja);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("DodajPodrucje")]
    public async Task<ActionResult> DodajPodrucje([FromBody]Podrucje podrucje)
    {
        try
        {
            await Context.Podrucja.AddAsync(podrucje);
            await Context.SaveChangesAsync();
            return Ok($"Upisano je podrucje sa ID: {podrucje.ID}.");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("IzmeniPodrucje")]
    public async Task<ActionResult> IzmeniPodrucje([FromBody]Podrucje podrucje)
    {
        try
        {
            Context.Podrucja.Update(podrucje);
            await Context.SaveChangesAsync();
            return Ok($"Izmenjeno je podrucje sa ID: {podrucje.ID}.");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("IzbrisiPodrucje/{id}")]
    public async Task<ActionResult> IzbrisiPodrucje(int id)
    {
        try
        {
            var podrucje = await Context.Podrucja.FindAsync(id);

            if (podrucje != null)
            {
                Context.Podrucja.Remove(podrucje);
                await Context.SaveChangesAsync();
                return Ok($"Podrucje sa ID: {id} je izbrisano.");
            }
            else
            {
                return NotFound($"Podrucje sa ID: {id} nije pronađeno.");
            }
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}
