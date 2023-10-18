using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using TeslaRenting.Entity;

namespace TeslaRenting.TeslaRentingInitializer;

public class TeslaCarInitialiser
{
    public static void SeedTeslaCars(ModelBuilder modelBuilder)
    {
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "teslaCarSeed.json");
        
        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException("Missing Seed File.");
        }

        var teslaCarSeedJson = File.ReadAllText(filePath);
        var teslaCarSeed = JsonConvert.DeserializeObject<List<TeslaCar>>(teslaCarSeedJson);
    }
}