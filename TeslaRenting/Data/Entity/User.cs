using System.ComponentModel.DataAnnotations;
using TeslaRenting.Data.Enum;

namespace TeslaRenting.Data.Entity;

public class User
{
    [Key]
    public int Id { get; set; }
    
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string PasswordHash { get; set; }
    
    public int UserAddressId { get; set; }
    public virtual Address UserAddress { get; set; }

    public int UserRoleId { get; set; } = 1;
    public virtual Role UserRole { get; set; }
    
    public IEnumerable<Reservation> Reservations { get; set; }
}