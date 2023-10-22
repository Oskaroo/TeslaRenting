using Microsoft.AspNetCore.Mvc;
using TeslaRenting.Entity;
using TeslaRenting.Model;
using TeslaRenting.Service;

namespace TeslaRenting.Controller;
[ApiController]
[Route("api/reservation")]
public class ReservationController : ControllerBase
{
    private readonly IReservationService _reservationService;

    public ReservationController(IReservationService reservationService)
    {
        _reservationService = reservationService;
    }
    [HttpGet]
    public ActionResult<IEnumerable<ReservationDto>> GetAll()
    {
        var reservationsDtos = _reservationService.GetAll();
        return Ok(reservationsDtos);
    }
    
    [HttpGet("{id}")]
    public ActionResult<ReservationDto> Get([FromRoute] int id)
    {
        var reservation = _reservationService.GetReservationById(id);
        
        return Ok(reservation);
    }
    [HttpPost]
    public ActionResult CreateReservation([FromBody] CreateReservationDto dto)
    {
        var id = _reservationService.Create(dto);
        
        return Created($"/api/reservation/{id}", null);
    }
    [HttpDelete("{id}")]
    public ActionResult Delete([FromRoute] int id)
    {
        _reservationService.Delete(id);
        
        return NoContent();
    }
    [HttpPut("{id}")]
    public ActionResult<ReservationDto> Update([FromBody] UpdateReservationDto dto, [FromRoute] int id, [FromServices] TeslaCar dailyRate)
    {
        _reservationService.Update(id, dto, dailyRate);
        return Ok();
    }
}