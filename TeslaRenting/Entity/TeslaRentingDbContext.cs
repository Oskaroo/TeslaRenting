using Newtonsoft.Json;

namespace TeslaRenting.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

public class TeslaRentingDbContext : DbContext
{
    public DbSet<Reservation> Reservations { get; set; }
    public DbSet<TeslaCar> TeslaModels { get; set; }
    private readonly List<TeslaCar> _teslaCarSeedData;

    public TeslaRentingDbContext(DbContextOptions<TeslaRentingDbContext> options) : base(options)
    {
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
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Reservation>()
            .HasKey(r => r.Id);
        modelBuilder.Entity<TeslaCar>()
            .HasKey(m => m.Id);
        modelBuilder.Entity<TeslaCar>()
            .Property(t => t.Name)
            .IsRequired();
        modelBuilder.Entity<TeslaCar>()
            .HasData(_teslaCarSeedData);
    }
}
