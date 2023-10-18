using TeslaRenting.Enums;

namespace TeslaRenting.Entities;

public class TeslaCar
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal DailyRate { get; set; }
    public string ImageUrl { get; set; }
    BaseLocations AvailableAt { get; set; }
}
