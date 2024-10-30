namespace TeslaRenting.Data.Model;

public class UpdateReservationDto
{
    public int TeslaCarId { get; set; }
    public DateTimeOffset StartDate { get; set; }
    public DateTimeOffset EndDate { get; set; } 
    
    public int UserId { get; set; }
}