using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TeslaRenting.Data.Entity;
using TeslaRenting.Data.Model;
using TeslaRenting.Service.Interface;

namespace TeslaRenting.Controller;
[ApiController]
[Route("api/reservation")]
[Authorize]
public class ReservationController : ControllerBase
{
    private readonly IReservationService _reservationService;

    public ReservationController(IReservationService reservationService)
    {
        _reservationService = reservationService;
    }
    [HttpGet]
    [Authorize (Roles = "Admin,Employee")]
    public async Task<ActionResult<IEnumerable<ReservationDto>>> GetAll()
    {
        var reservationsDtos = _reservationService.GetAll();
        return Ok(reservationsDtos);
    }
    
    [HttpGet("{id}")]
    [Authorize (Roles = "Admin,Employee")]
    public async Task<ActionResult<ReservationDto>> Get([FromRoute] int id)
    {
        var reservation = await _reservationService.GetReservationById(id);
        
        return Ok(reservation);
    }
    [HttpPost]
    public async Task<ActionResult> CreateReservation([FromBody] CreateReservationDto dto)
    {
        var id = await _reservationService.Create(dto);
        
        return Created($"/api/reservation/{id}", null);
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete([FromRoute] int id)
    {
       await _reservationService.Delete(id);
        
        return NoContent();
    }
    [HttpPut("{id}")]
    public async Task<ActionResult<ReservationDto>> Update([FromBody] UpdateReservationDto dto, [FromRoute] int id)
    {
        await _reservationService.Update(id, dto);
        return Ok();
    }
}