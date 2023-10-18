namespace TeslaRenting.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;

public class TeslaRentingDbContext : DbContext
{
    private static IConfiguration _configuration;
    private string connectionString = _configuration.GetConnectionString("TeslaRentingDatabase");
    public DbSet<Reservation> Reservations { get; set; }
    public DbSet<TeslaCar> TeslaModels { get; set; }

    public TeslaRentingDbContext(DbContextOptions<TeslaRentingDbContext> options, IConfiguration configuration) : base(options)
    {
        _configuration = configuration;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Reservation>()
            .HasKey(r => r.Id);
        modelBuilder.Entity<TeslaCar>()
            .HasKey(m => m.Id);
    }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(connectionString);
    }
}
