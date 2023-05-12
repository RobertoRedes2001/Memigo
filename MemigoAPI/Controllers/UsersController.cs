using Google.Protobuf.WellKnownTypes;
using MemigoAPI.Model;
using MemigoAPI.Model.DTO.User;
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
        public UsersController(MemigoV1Context userCtx)
        {
            _context = userCtx;
        }
        [HttpGet] //EndPoint
        public IActionResult Get()
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
        public IActionResult Post(AgregarUserDTO insertUser)
        {
           var user = new User() { Username= insertUser.nombre, Pass=insertUser.contra, Email=insertUser.email, 
                UserImg=insertUser.pfp};
           _context.Users.Add(user); 
           _context.SaveChanges();
           return Ok();
        }
        [HttpDelete]
        [Route("DeleteUsuario/")]
        public IActionResult Delete(BorrarUserDTO deleteUser)
        {
            var user = _context.Users.Where(User => User.IdUser == deleteUser.id).FirstOrDefault();
            _context.Users.Remove(user);
            _context.SaveChanges();
            return Ok();
        }
        [HttpPatch]
        [Route("UpdateUsuario/")]
        public IActionResult Update(ActualizarUserDTO updateUser)
        {
            var user = _context.Users.Where(User => User.IdUser == updateUser.id).FirstOrDefault();
            user.Username = (user.Username != updateUser.nombre) ? updateUser.nombre : user.Username;
            _context.Users.Update(user);
            _context.SaveChanges();
            return Ok();
        }
    }
}
