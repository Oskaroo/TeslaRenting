using Microsoft.AspNetCore.Mvc;
using TeslaRenting.Model;
using TeslaRenting.Service;

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
    public ActionResult<IEnumerable<ReservationDto>> GetAll()
    {
        var reservationsDtos = _userService.GetAll();
        return Ok(reservationsDtos);
    }

    [HttpGet("{id}")]
    public ActionResult<UserDto> Get([FromRoute] int id)
    {
        var reservation = _userService.GetUserById(id);

        return Ok(reservation);
    }
    [HttpPost]
    public ActionResult RegisterUser([FromBody] RegisterUserDto dto)
    {
        _userService.RegisterUser(dto);
        return Ok();
    }
}