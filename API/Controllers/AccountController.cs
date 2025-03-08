using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(SignInManager<User> signInManager) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult> RegisterUser(RegisterDto registerDto)
    {
        var user = new User { UserName = registerDto.Email, Email = registerDto.Email };
        var result = await signInManager.UserManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }

            return ValidationProblem();
        }

        await signInManager.UserManager.AddToRoleAsync(user, "Member");

        return Ok();
    }


    [HttpGet("user-info")]
    public async Task<ActionResult> GetUserInfo()
    {
        if (User.Identity?.IsAuthenticated == false)
        {
            return NoContent();
        }
        
        var user =  await signInManager.UserManager.GetUserAsync(User);
        if (user == null) return Unauthorized();
        var roles = await signInManager.UserManager.GetRolesAsync(user);
        return Ok(new
        {
            user.Email,
            user.UserName,
            Roles = roles
        });
    }

    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        await signInManager.SignOutAsync();
        return NoContent();
    }

    [HttpPost("address")]
    public async Task<ActionResult<Adress>> CreateUpdateAdress(Adress adress)
    {
        var user = await signInManager.UserManager.Users
            .Include(x => x.Adress)
            .FirstOrDefaultAsync(x=> x.UserName == User.Identity!.Name);
        
        if (user == null) return Unauthorized();
        
        user.Adress = adress;
        
        var result = await signInManager.UserManager.UpdateAsync(user);
        
        if(!result.Succeeded) return BadRequest("Problem updating adress");
        
        return Ok();
    }

    [Authorize]
    [HttpGet("address")]
    public async Task<ActionResult<Adress>> GetUpdateAdress()
    {
        var address = await signInManager.UserManager.Users
            .Where(x => x.UserName == User.Identity!.Name)
            .Select(x => x.Adress)
            .FirstOrDefaultAsync();
        
        if(address == null) return NoContent();
        
        return address;
    }
}