using Microsoft.AspNetCore.Identity;

namespace API.Entities;

public class User : IdentityUser
{
    public int? AdressId { get; set; }
    public Adress? Adress { get; set; }
}