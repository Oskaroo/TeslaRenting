using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TeslaRenting.Data.Enum;
using TeslaRenting.Data.Model;
using TeslaRenting.Data.Model.Validator;
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
    [Authorize(Roles = "Admin,Employee")]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetAll()
    {
        var userDtos = await _userService.GetAll();
        return Ok(userDtos);
    }

    [HttpGet("{id}")]
    [Authorize(Roles = "Admin,Employee")]
    public async Task<ActionResult<UserDto>> Get([FromRoute] int id)
    {
        var user =await _userService.GetUserById(id);

        return Ok(user);
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<ActionResult> RegisterUser([FromBody] RegisterUserDto dto)
    {
        await _userService.RegisterUser(dto);
        return Ok();
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<ActionResult> Login([FromBody] LoginDto dto)
    {
        string token = await _userService.GenerateJwt(dto);
        return Ok(token);
    }
    
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> Delete([FromRoute] int id)
    {
        await _userService.Delete(id);

        return NoContent();
    }
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> AssignRole([FromBody] AssignRoleDto dto, [FromRoute] int id)
    {
       await _userService.Assign(dto, id);
        return Ok();
    }
    

}