using MemigoAPI.Datos;
using MemigoAPI.Modelo;
using Microsoft.AspNetCore.Mvc;

namespace MemigoAPI.Controllers
{
    [ApiController]
    [Route("api/usuarios")]
    public class UsersController
    {
        [HttpGet]
        public async Task<ActionResult<List<Musers>>> Get()
        {
            var funcion = new Dusers();
            var lista = await funcion.MostrarUsuarios();
            return lista;
        }
    }
}
