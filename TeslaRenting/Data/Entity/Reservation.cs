using System.ComponentModel.DataAnnotations;

namespace TeslaRenting.Data.Entity;

public class Reservation
{ 
        [Key]
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; } 
        public decimal TotalCost { get; set; }
        
        public int TeslaCarId { get; set; } 
        public virtual TeslaCar TeslaCar { get; set; }
        
        public int UserId { get; set; }
        public virtual User User { get; set; }
}
