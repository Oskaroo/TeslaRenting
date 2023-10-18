using TeslaRenting.Enum;

namespace TeslaRenting.Model;

public class ReservationDto
{
    public int Id { get; set; }
    public string CustomerName { get; set; }
    public string CustomerEmail { get; set; }
    public string CustomerPhone { get; set; }
    public int TeslaCarId { get; set; }
    public Availability AvailableAt { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; } 
    public decimal TotalCost { get; set; }
}