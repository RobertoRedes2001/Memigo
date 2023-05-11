using MemigoAPI.Model;
using Microsoft.AspNetCore.Mvc;

namespace MemigoAPI.Controllers
{
    [ApiController]
    [Route("api/memes")]
    public class MemeController : ControllerBase
    {
        private readonly MemigoV1Context _context;
        public MemeController(MemigoV1Context memeCtx)
        {
            _context = memeCtx;
        }
        [HttpGet]
        public IActionResult Index()
        {
            var memes = _context.Memes.ToList<Meme>();
            return Ok(memes);
        }
    }
}
