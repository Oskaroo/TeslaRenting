using TeslaRenting.Enum;

namespace TeslaRenting.Entity;

public class TeslaCar
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal DailyRate { get; set; }
    public string? ImageUrl { get; set; }
    
    public Availability AvailableAt { get; set; }
    
    public virtual ICollection<Reservation> Reservations { get; set; }
}
