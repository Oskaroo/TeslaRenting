namespace TeslaRenting.Model;

public class UpdateReservationDto
{
    public int TeslaCarId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; } 
    
    public int UserId { get; set; }
}