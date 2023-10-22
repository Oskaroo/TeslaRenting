using TeslaRenting.Enum;

namespace TeslaRenting.Model;

public class UpdateTeslaCarDto
{
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal DailyRate { get; set; }
    public string? ImageUrl { get; set; }
    
    public Availability AvailableAt { get; set; }
}