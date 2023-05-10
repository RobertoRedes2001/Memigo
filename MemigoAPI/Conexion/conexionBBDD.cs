namespace MemigoAPI.Conexion
{
    public class conexionBBDD
    {
        private string connectionString = string.Empty;
        public conexionBBDD()
        {
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json").Build();
            connectionString = builder.GetSection("ConnectionStrings:conexionmaestra").Value;
        }

        public string cadenaMySQL()
        {
            return connectionString;
        }
    }
}
