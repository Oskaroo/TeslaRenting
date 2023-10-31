using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TeslaRenting.Data.Model;
using TeslaRenting.Service.Interface;

namespace TeslaRenting.Controller;

[Route("api/teslaCar")]
[ApiController]
public class TeslaCarController : ControllerBase
{
    private readonly ITeslaCarService _teslaCarService;

    public TeslaCarController(ITeslaCarService teslaCarService)
    {
        _teslaCarService = teslaCarService;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TeslaCarDto>>> GetAll()
    {
        var  teslaCarsDtos = await _teslaCarService.GetAll();
        return Ok(teslaCarsDtos);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<TeslaCarDto>> Get([FromRoute] int id)
    {
        var teslaCar = await _teslaCarService.GetTeslaCarById(id);
        
        return Ok(teslaCar);
    }
    
    [HttpPost]
    [Authorize (Roles = "Admin,Employee")]
    public async Task<ActionResult> CreateTeslaCar([FromBody] CreateTeslaCarDto dto)
    {
        var id = await _teslaCarService.Create(dto);
        
        return Created($"/api/teslaCar/{id}", null);
    }
    
    [HttpPut("{id}")]
    [Authorize (Roles = "Admin,Employee")]
    public async Task<ActionResult<TeslaCarDto>> Update([FromBody] UpdateTeslaCarDto dto, [FromRoute] int id)
    {
        await _teslaCarService.Update(id, dto);
        return Ok();
    }
    
    [HttpDelete("{id}")]
    [Authorize (Roles = "Admin,Employee")]
    public async Task<ActionResult> Delete([FromRoute] int id)
    {
        await _teslaCarService.Delete(id);
        
        return NoContent();
    }
}
