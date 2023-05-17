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
        //Solicitud HTTP GET al endpoint, retorna una respuesta IActionResult.
        //Obtiene la lista de memes de la BBDD y se asigna a la variable "memes".
        [HttpGet] //EndPoint
        public IActionResult Get()
        {
            var memes = _context.Memes.ToList<Meme>();
            return Ok(memes);
        }
        //HTTP GET que recibe un Id de meme y busca el meme correspondiente en la base de datos,
        //devuelve una respuesta Ok con el meme encontrado.
        [HttpGet] //EndPoint
        [Route("GetMeme/{IdMeme}")]
        public IActionResult GetOneMeme([FromRoute] int IdMeme)
        {
            var memes = _context.Memes.Where<Meme>(Meme => Meme.IdMeme == IdMeme);
            return Ok(memes);

        }
        //HTTP GET que recibe un Id de un usuario y busca el meme correspondiente en la base de datos,
        //devuelve una respuesta Ok con el meme encontrado.
        [HttpGet] //EndPoint
        [Route("GetMemeUser/{idUser}")]
        public IActionResult GetMemesFromUser([FromRoute] int IdUser)
        {
            var memes = _context.Memes.Where<Meme>(Meme => Meme.IdUser == IdUser);
            return Ok(memes);

        }
        //HTTP Post que recibe un objeto AgregarMemeDTO y,
        //devuelve una respuesta Ok con el meme posteado.
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
        //HTTP Delete que recibe un objeto BorrarMemeDTO y,
        //devuelve una respuesta Ok para borrar el meme.
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
        //HTTP Patch que recibe un objeto ActualizarMemeDTO y,
        //devuelve una respuesta Ok para dar me gusta a un meme.
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
        //HTTP Patch que recibe un objeto ActualizarMemeDTO y,
        //devuelve una respuesta Ok para quitar me gusta a un meme.
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
