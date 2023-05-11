using System;
using System.Collections.Generic;

namespace MemigoAPI.Model;

public partial class User
{
    public int IdUser { get; set; }

    public string Username { get; set; } = null!;

    public string Pass { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? UserImg { get; set; }

    public virtual ICollection<Meme>? Memes { get; set; } = new List<Meme>();
}
