namespace MemigoAPI.Model.DTO.Meme
{
    public class AgregarMemeDTO
    {
        public int idUser { get; set; }
        public string memeImg { get; set; }
        public int likes { get; set;} = 0;
    }
}
