using TeslaRenting.Data.Enum;

namespace TeslaRenting.Data.Model;

public class TeslaCarDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal DailyRate { get; set; }
    public string? ImageUrl { get; set; }
    
    public Availability AvailableAt { get; set; }
}