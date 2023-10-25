namespace TeslaRenting.Data.Entity;

public class Role
{
    public int Id { get; set; }
    public string Name { get; set; }
    
    public virtual ICollection<User> Users { get; set; }
}