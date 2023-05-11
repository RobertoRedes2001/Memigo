using System;
using System.Collections.Generic;

namespace MemigoAPI.Model;

public partial class Meme
{
    public int IdMeme { get; set; }

    public int IdUser { get; set; }

    public string MemeImg { get; set; } = null!;

    public int Likes { get; set; }

    public virtual User IdUserNavigation { get; set; } = null!;
}
