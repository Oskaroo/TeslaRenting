using AutoMapper;
using TeslaRenting.Entity;
using TeslaRenting.Exception;
using TeslaRenting.Model;

namespace TeslaRenting.Service;

public interface ITeslaCarService
{
    IEnumerable<TeslaCarDto> GetAll(); 
    TeslaCarDto GetTeslaCarById(int id);
    int Create(CreateTeslaCarDto dto);
    void Update(int id, UpdateTeslaCarDto dto);
    void Delete(int id);
}

public class TeslaCarService : ITeslaCarService
{
    private readonly TeslaRentingDbContext _dbContext;
    private readonly IMapper _mapper;

    public TeslaCarService(TeslaRentingDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }
    public IEnumerable<TeslaCarDto> GetAll()
    {
        var teslaCar = _dbContext.TeslaCars.ToList();
        var teslaCarsDtos = _mapper.Map<List<TeslaCarDto>>(teslaCar);
        return teslaCarsDtos;
    }

    public TeslaCarDto GetTeslaCarById(int id)
    {
        var teslaCar = _dbContext.TeslaCars.FirstOrDefault(t => t.Id == id);
        if (teslaCar is null)
            throw new NotFoundException("Tesla model not found");
        var result = _mapper.Map<TeslaCarDto>(teslaCar);
        return result;
    }

    public int Create(CreateTeslaCarDto dto)
    {
        var teslaCar = _mapper.Map<TeslaCar>(dto);
        _dbContext.TeslaCars.Add(teslaCar);
        _dbContext.SaveChanges();
        return teslaCar.Id;
    }

    public void Update(int id, UpdateTeslaCarDto dto)
    {
        var teslaCar = _dbContext.TeslaCars.FirstOrDefault(t => t.Id == id);
        if (teslaCar is null)
            throw new NotFoundException("Tesla model not found");
        teslaCar.Name = dto.Name;
        teslaCar.Description = dto.Description;
        teslaCar.AvailableAt = dto.AvailableAt;
        teslaCar.DailyRate = dto.DailyRate;
        teslaCar.ImageUrl = dto.ImageUrl;
        _dbContext.SaveChanges();
    }

    public void Delete(int id)
    {
        var teslaCar = _dbContext.TeslaCars.FirstOrDefault(t => t.Id == id);
        if (teslaCar is null)
            throw new NotFoundException("Tesla model not found");
        _dbContext.TeslaCars.Remove(teslaCar);
        _dbContext.SaveChanges();
    }
}