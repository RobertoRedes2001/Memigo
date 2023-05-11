using Google.Protobuf.WellKnownTypes;
using MemigoAPI.Model;
using MemigoAPI.Model.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.VisualBasic;
using System;
using System.Collections;

namespace MemigoAPI.Controllers
{
    [ApiController]
    [Route("api/usuarios")]
    public class UsersController : ControllerBase
    {
        private readonly MemigoV1Context _context;
        public UsersController(MemigoV1Context memeCtx)
        {
            _context = memeCtx;
        }
        [HttpGet] //EndPoint
        public IActionResult Get([FromRoute] int IdUsuario)
        {
            var usuarios = _context.Users.ToList<User>();
            return Ok(usuarios);

        }
        [HttpGet] //EndPoint
        [Route("GetUsuario/{IdUsuario}")]
        public IActionResult GetOneUser([FromRoute] int IdUsuario)
        {
           var usuarios = _context.Users.Where<User>(User => User.IdUser == IdUsuario);
            return Ok(usuarios);

        }
        [HttpPost]
        [Route("PostUsuario/")]
        public IActionResult Post(AgregarUserDTO usuario)
        {
           var user = new User() { Username=usuario.nombre, Pass=usuario.contra, Email=usuario.email, 
                UserImg=usuario.pfp};
           _context.Users.Add(user); 
           _context.SaveChanges();
           return Ok();
        }
        [HttpDelete]
        [Route("DeleteUsuario/")]
        public IActionResult Delete(BorrarUserDTO usuario)
        {
            var user = _context.Users.Where(User => User.IdUser == usuario.id).FirstOrDefault();
            _context.Users.Remove(user);
            _context.SaveChanges();
            return Ok();
        }
        [HttpPatch]
        [Route("UpdateUsuario/")]
        public IActionResult Update(ActualizarUserDTO usuario)
        {
            var user = _context.Users.Where(User => User.IdUser == usuario.id).FirstOrDefault();
            user.Username = (user.Username != usuario.nombre) ? usuario.nombre : user.Username;
            _context.Users.Update(user);
            _context.SaveChanges();
            return Ok();
        }
    }
}
