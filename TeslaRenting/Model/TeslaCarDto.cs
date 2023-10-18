using TeslaRenting.Enum;

namespace TeslaRenting.Model;

public class TeslaCarDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal DailyRate { get; set; }
    public string ImageUrl { get; set; }
    Availability AvailableAt { get; set; }
}