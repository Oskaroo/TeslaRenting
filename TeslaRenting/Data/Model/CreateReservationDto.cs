

namespace TeslaRenting.Data.Model;

public class CreateReservationDto
{
    public int TeslaCarId { get; set; }
    public DateTimeOffset StartDate { get; set; }
    public DateTimeOffset EndDate { get; set; } 
    public int UserId { get; set; }
    
    
}