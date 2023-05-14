using MemigoAPI.Model;
using MemigoAPI.Model.DTO.Meme;
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
        [HttpGet] //EndPoint
        public IActionResult Get()
        {
            var memes = _context.Memes.ToList<Meme>();
            return Ok(memes);
        }
        [HttpGet] //EndPoint
        [Route("GetMeme/{IdMeme}")]
        public IActionResult GetOneMeme([FromRoute] int IdMeme)
        {
            var memes = _context.Memes.Where<Meme>(Meme => Meme.IdMeme == IdMeme);
            return Ok(memes);

        }
        [HttpPost]
        [Route("PostMeme/")]
        public IActionResult Post(AgregarMemeDTO insertMeme)
        {
            var meme = new Meme()
            {
                IdUser = insertMeme.idUser,
                MemeImg = insertMeme.memeImg,
            };
            _context.Memes.Add(meme);
            _context.SaveChanges();
            return Ok();
        }
        [HttpDelete]
        [Route("DeleteMeme/")]
        public IActionResult Delete(BorrarMemeDTO deleteMeme)
        {
            var meme = _context.Memes.Where(Meme => Meme.IdMeme == deleteMeme.id).FirstOrDefault();
            if (meme == null)
            {
                return NotFound();
            }
            _context.Memes.Remove(meme);
            _context.SaveChanges();
            return Ok();
        }
        [HttpPatch]
        [Route("LikeMeme/")]
        public IActionResult UpdateLike(ActualizarMemeDTO updateMeme)
        {
            var meme = _context.Memes.Where(Meme => Meme.IdMeme == updateMeme.id).FirstOrDefault();
            if (meme == null)
            {
                return NotFound();
            }
            meme.Likes++;
            _context.Memes.Update(meme);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPatch]
        [Route("DislikeMeme/")]
        public IActionResult UpdateDislike(ActualizarMemeDTO updateMeme)
        {
            var meme = _context.Memes.Where(Meme => Meme.IdMeme == updateMeme.id).FirstOrDefault();
            if (meme == null)
            {
                return NotFound();
            }
            if(meme.Likes > 0)
            {
                meme.Likes--;
                _context.Memes.Update(meme);
                _context.SaveChanges();
            }
            return Ok();
        }

    }
}
