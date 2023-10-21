using TeslaRenting.Enum;

namespace TeslaRenting.Model;

public class RegisterUserDto
{
    public int Id { get; set; }
    
    public string FirstName { get; set; }
    public string LastName { get; set; }
    DateTime DateOfBirth { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string ConfirmPassword { get; set; }
    public string Phone { get; set; }
    
    public string Country { get; set; }
    public string City { get; set; }
    public string Street { get; set; }
    public string PostalCode { get; set; }
    
    public Role Role { get; set; } = Role.User;
}