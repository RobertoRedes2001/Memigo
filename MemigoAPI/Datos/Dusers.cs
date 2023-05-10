using MemigoAPI.Conexion;
using MemigoAPI.Modelo;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace MemigoAPI.Datos
{
    public class Dusers
    {
        conexionBBDD cn = new conexionBBDD();
        public async Task<List<Musers>> MostrarUsuarios() 
        {
            var lista = new List<Musers>();
            using (var sql = new SqlConnection(cn.cadenaMySQL()))
            {
                using (var cmd = new SqlCommand("select_all_users", sql))
                {
                    await sql.OpenAsync();
                    cmd.CommandType = CommandType.StoredProcedure;
                    using(var item = await cmd.ExecuteReaderAsync())
                    {
                        while(await item.ReadAsync())
                        {
                            var musers = new Musers();
                            musers.id = (int)item["id"];
                            musers.username = (string)item["username"];
                            musers.pass = (string)item["pass"];
                            musers.user_img = (string)item["user_img"];
                            lista.Add(musers);

                        }
                    }
                }
            };
            return lista;
        }
    }
}
