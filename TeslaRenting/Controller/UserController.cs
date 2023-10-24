using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TeslaRenting.Data.Model;
using TeslaRenting.Service.Interface;

namespace TeslaRenting.Controller;

[Route("api/user")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    [Authorize]
    public ActionResult<IEnumerable<UserDto>> GetAll()
    {
        var userDtos = _userService.GetAll();
        return Ok(userDtos);
    }

    [HttpGet("{id}")]
    [Authorize(Roles = "Admin,Employee")]
    public ActionResult<UserDto> Get([FromRoute] int id)
    {
        var user = _userService.GetUserById(id);

        return Ok(user);
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public ActionResult RegisterUser([FromBody] RegisterUserDto dto)
    {
        _userService.RegisterUser(dto);
        return Ok();
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public ActionResult Login([FromBody] LoginDto dto)
    {
        string token = _userService.GenerateJwt(dto);
        return Ok(token);
    }
    
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public ActionResult Delete([FromRoute] int id)
    {
        _userService.Delete(id);

        return NoContent();
    }
    

}