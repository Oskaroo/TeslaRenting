using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TeslaRenting.Data.Entity;
using TeslaRenting.Data.Model;
using TeslaRenting.Exception;
using TeslaRenting.Service.Interface;

namespace TeslaRenting.Service;


public class ReservationService : IReservationService
{
    private readonly TeslaRentingDbContext _dbContext;
    private readonly IMapper _mapper;
    private readonly ILogger<ReservationService> _logger;

    public ReservationService(TeslaRentingDbContext dbContext,IMapper mapper, ILogger<ReservationService> logger)
    {
        _dbContext = dbContext;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<ReservationDto> GetReservationById(int id)
    {
        var reservation = await _dbContext.Reservations
            .Include(r => r.TeslaCar)
            .Include(r => r.User)
            .FirstOrDefaultAsync(r => r.Id == id);
        
        if(reservation is null) 
            throw new NotFoundException("Reservation not found");
        
        var result = _mapper.Map<ReservationDto>(reservation);
        return result;
    }

    public async Task<int> Create(CreateReservationDto dto)
    {
        var reservation = _mapper.Map<Reservation>(dto);
        var teslaModel = await _dbContext.TeslaCars.FirstOrDefaultAsync(t => t.Id == dto.TeslaCarId);
        if (teslaModel is null)
            throw new NotFoundException("Tesla model not found");
        
        reservation.TotalCost = teslaModel.DailyRate * (dto.EndDate - dto.StartDate).Days;
        await _dbContext.Reservations.AddAsync(reservation);
        await _dbContext.SaveChangesAsync();
        
        return reservation.Id;
    }

    public async Task Delete(int id)
    {
        _logger.LogError($"Restaurant with id: {id} DELETE action invoked");
        var reservation = await _dbContext
            .Reservations
            .FirstOrDefaultAsync(r => r.Id == id);
        if (reservation is null)
            throw new NotFoundException("Reservation not found");
        _dbContext.Reservations.Remove(reservation);
       await _dbContext.SaveChangesAsync();
    }
    
    public async Task Update(int id, UpdateReservationDto dto)
    {
        var reservation = await _dbContext
            .Reservations
            .FirstOrDefaultAsync(r => r.Id == id);
        var teslaCar = await _dbContext.TeslaCars.FirstOrDefaultAsync(t => t.Id == dto.TeslaCarId);
        if (reservation is null)
            throw new NotFoundException("Reservation not found");
        reservation.TeslaCarId = dto.TeslaCarId;
        reservation.StartDate = dto.StartDate;
        reservation.EndDate = dto.EndDate;
        if (teslaCar is null)
            throw new NotFoundException("Tesla model not found");
        reservation.TotalCost = CalculatePrice(teslaCar.DailyRate, dto.StartDate, dto.EndDate);
       await _dbContext.SaveChangesAsync();
    }

    public async Task<IEnumerable<ReservationDto>> GetAll()
    {
        var reservations = await _dbContext.Reservations
            .Include(r => r.TeslaCar)
            .Include(r => r.User)
            .ToListAsync();
        var reservationsDtos = _mapper.Map<List<ReservationDto>>(reservations);
        return reservationsDtos;
    }
    
    
// Calculate the difference between two dates and multiply it by the daily rate of the car
    public decimal CalculatePrice(decimal dailyRate, DateTime startDate, DateTime endDate)
    {
        var days = (endDate - startDate).Days;
        var result = dailyRate * days;
        return result;
    }
}