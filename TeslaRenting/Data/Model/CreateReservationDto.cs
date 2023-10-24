

namespace TeslaRenting.Data.Model;

public class CreateReservationDto
{
    public int TeslaCarId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; } 
    public int UserId { get; set; }
    
    
}