using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace TeslaRenting.Data.Entity;

public class TeslaRentingDbContext : DbContext
{
    public DbSet<Reservation> Reservations { get; set; }
    public DbSet<TeslaCar> TeslaCars { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Address> Addresses { get; set; }
    
    private readonly List<TeslaCar> _teslaCarSeedData;
    private readonly List<User> _userSeedData;
    private readonly List<Address> _addressSeedData;

    public TeslaRentingDbContext(DbContextOptions<TeslaRentingDbContext> options) : base(options)
    {
        //seed TeslaCar from Json
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "teslaCarSeed.json");
        if (File.Exists(filePath))
        {
            var teslaCarSeedJson = File.ReadAllText(filePath);
            _teslaCarSeedData = JsonConvert.DeserializeObject<List<TeslaCar>>(teslaCarSeedJson);
        }
        else
        {
            _teslaCarSeedData = new List<TeslaCar>();
        }
        //seed Address from Json
        var addressSeedPath = Path.Combine(Directory.GetCurrentDirectory(), "addressSeed.json");
        if (File.Exists(addressSeedPath))
        {
            var addressSeedJson = File.ReadAllText(addressSeedPath);
            _addressSeedData = JsonConvert.DeserializeObject<List<Address>>(addressSeedJson);
        }
        else
        {
            _addressSeedData = new List<Address>();
        }
        
        //seed User from Json
        var userSeedPath = Path.Combine(Directory.GetCurrentDirectory(), "userSeed.json");
        if (File.Exists(userSeedPath))
        {
            var userSeedJson = File.ReadAllText(userSeedPath);
            _userSeedData = JsonConvert.DeserializeObject<List<User>>(userSeedJson);
            if (_userSeedData is null) throw new System.Exception("UserSeedData is empty");
            foreach (var user in _userSeedData)
            {
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
            }
        }
        else
        {
            _userSeedData = new List<User>();
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        
        modelBuilder.Entity<TeslaCar>()
            .Property(t => t.Name)
            .IsRequired();
        modelBuilder.Entity<TeslaCar>()
            .HasData(_teslaCarSeedData);
        modelBuilder.Entity<TeslaCar>()
            .Property(t => t.AvailableAt)
            .HasConversion<string>();
        modelBuilder.Entity<User>()
            .Property(u => u.Role)
            .HasConversion<string>();
        modelBuilder.Entity<User>()
            .HasOne(u => u.UserAddress)
            .WithMany(a => a.Users)
            .HasForeignKey(u => u.UserAddressId);
        modelBuilder.Entity<Address>()
            .HasData(_addressSeedData);
        modelBuilder.Entity<User>()
            .HasData(_userSeedData);
        
    }
}
