using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TeslaRenting.Data.Model;
using TeslaRenting.Service.Interface;

namespace TeslaRenting.Controller;

[Route("api/teslaCar")]
[ApiController]
[Authorize]
public class TeslaCarController : ControllerBase
{
    private readonly ITeslaCarService _teslaCarService;

    public TeslaCarController(ITeslaCarService teslaCarService)
    {
        _teslaCarService = teslaCarService;
    }
    
    [HttpGet]
    public ActionResult<IEnumerable<TeslaCarDto>> GetAll()
    {
        var teslaCarsDtos = _teslaCarService.GetAll();
        return Ok(teslaCarsDtos);
    }
    
    [HttpGet("{id}")]
    public ActionResult<TeslaCarDto> Get([FromRoute] int id)
    {
        var teslaCar = _teslaCarService.GetTeslaCarById(id);
        
        return Ok(teslaCar);
    }
    
    [HttpPost]
    [Authorize (Roles = "Admin,Employee")]
    public ActionResult CreateTeslaCar([FromBody] CreateTeslaCarDto dto)
    {
        var id = _teslaCarService.Create(dto);
        
        return Created($"/api/teslaCar/{id}", null);
    }
    
    [HttpPut("{id}")]
    [Authorize (Roles = "Admin,Employee")]
    public ActionResult<TeslaCarDto> Update([FromBody] UpdateTeslaCarDto dto, [FromRoute] int id)
    {
        _teslaCarService.Update(id, dto);
        return Ok();
    }
    
    [HttpDelete("{id}")]
    [Authorize (Roles = "Admin,Employee")]
    public ActionResult Delete([FromRoute] int id)
    {
        _teslaCarService.Delete(id);
        
        return NoContent();
    }
}
