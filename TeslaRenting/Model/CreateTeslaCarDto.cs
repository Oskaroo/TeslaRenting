using TeslaRenting.Enum;

namespace TeslaRenting.Model;

public class CreateTeslaCarDto
{
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal DailyRate { get; set; }
    public string? ImageUrl { get; set; }
    
    public Availability AvailableAt { get; set; }
}