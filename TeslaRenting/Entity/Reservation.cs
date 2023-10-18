using TeslaRenting.Enum;

namespace TeslaRenting.Entity;

public class Reservation
{
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string CustomerEmail { get; set; }
        public string CustomerPhone { get; set; }
        public string Address { get; set; }
        public int TeslaCarId { get; set; }
        public Availability AvailableAt { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; } 
        public decimal TotalCost { get; set; }
}
