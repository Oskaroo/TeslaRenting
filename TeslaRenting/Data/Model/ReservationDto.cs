using TeslaRenting.Data.Entity;

namespace TeslaRenting.Data.Model;

public class ReservationDto
{
    public int Id { get; set; }
    public DateTimeOffset StartDate { get; set; }
    public DateTimeOffset EndDate { get; set; } 
    public decimal TotalCost { get; set; }
    
    public int TeslaCarId { get; set; }
    
    public int UserId { get; set; }

}