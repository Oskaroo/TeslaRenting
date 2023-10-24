using System.ComponentModel.DataAnnotations;

namespace TeslaRenting.Data.Entity;

public class Address
{
    [Key]
    public int Id { get; set; }
    public string Country { get; set; }
    public string City { get; set; }
    public string Street { get; set; }
    public string PostalCode { get; set; }
    
    
    public List<User> Users { get; set; }
    
}