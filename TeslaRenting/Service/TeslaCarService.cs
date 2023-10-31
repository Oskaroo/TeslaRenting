using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TeslaRenting.Data.Entity;
using TeslaRenting.Data.Model;
using TeslaRenting.Exception;
using TeslaRenting.Service.Interface;

namespace TeslaRenting.Service;

public class TeslaCarService : ITeslaCarService
{
    private readonly TeslaRentingDbContext _dbContext;
    private readonly IMapper _mapper;

    public TeslaCarService(TeslaRentingDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }
    public async Task<IEnumerable<TeslaCarDto>> GetAll()
    {
        var teslaCar = await _dbContext.TeslaCars.ToListAsync();
        var teslaCarsDtos = _mapper.Map<List<TeslaCarDto>>(teslaCar);
        return teslaCarsDtos;
    }

    public async Task<TeslaCarDto> GetTeslaCarById(int id)
    {
        var teslaCar = await _dbContext.TeslaCars.FirstOrDefaultAsync(t => t.Id == id);
        if (teslaCar is null)
            throw new NotFoundException("Tesla model not found");
        var result = _mapper.Map<TeslaCarDto>(teslaCar);
        return result;
    }

    public async Task<int> Create(CreateTeslaCarDto dto)
    {
        var teslaCar = _mapper.Map<TeslaCar>(dto);
        await _dbContext.TeslaCars.AddAsync(teslaCar);
        await _dbContext.SaveChangesAsync();
        return teslaCar.Id;
    }

    public async Task Update(int id, UpdateTeslaCarDto dto)
    {
        var teslaCar = await _dbContext.TeslaCars.FirstOrDefaultAsync(t => t.Id == id);
        if (teslaCar is null)
            throw new NotFoundException("Tesla model not found");
        teslaCar.Name = dto.Name;
        teslaCar.Description = dto.Description;
        teslaCar.AvailableAt = dto.AvailableAt;
        teslaCar.DailyRate = dto.DailyRate;
        teslaCar.ImageUrl = dto.ImageUrl;
       await _dbContext.SaveChangesAsync();
    }

    public async Task Delete(int id)
    {
        var teslaCar = await _dbContext.TeslaCars.FirstOrDefaultAsync(t => t.Id == id);
        if (teslaCar is null)
            throw new NotFoundException("Tesla model not found");
        _dbContext.TeslaCars.Remove(teslaCar);
       await _dbContext.SaveChangesAsync();
    }
}