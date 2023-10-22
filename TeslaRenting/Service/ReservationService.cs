using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TeslaRenting.Entity;
using TeslaRenting.Exception;
using TeslaRenting.Model;

namespace TeslaRenting.Service;

public interface IReservationService
{
    ReservationDto GetReservationById(int id);
    int Create(CreateReservationDto dto);
    void Delete(int id);
    void Update(int id, UpdateReservationDto dto, TeslaCar teslaCar);
    IEnumerable<ReservationDto> GetAll();
}

public class ReservationService : IReservationService
{
    private readonly TeslaRentingDbContext _dbContext;
    private readonly IMapper _mapper;

    public ReservationService(TeslaRentingDbContext dbContext,IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public ReservationDto GetReservationById(int id)
    {
        var reservation = _dbContext.Reservations
            .Include(r => r.TeslaCar)
            .Include(r => r.User)
            .FirstOrDefault(r => r.Id == id);
        
        if(reservation is null) 
            throw new NotFoundException("Reservation not found");
        
        var result = _mapper.Map<ReservationDto>(reservation);
        return result;
    }

    public int Create(CreateReservationDto dto)
    {
        var reservation = _mapper.Map<Reservation>(dto);
        var teslaModel = _dbContext.TeslaCars.FirstOrDefault(t => t.Id == dto.TeslaCarId);
        if (teslaModel is null)
            throw new NotFoundException("Tesla model not found");
        
        reservation.TotalCost = teslaModel.DailyRate * (dto.EndDate - dto.StartDate).Days;
        _dbContext.Reservations.Add(reservation);
        _dbContext.SaveChanges();
        
        return reservation.Id;
    }

    public void Delete(int id)
    {
        var reservation = _dbContext
            .Reservations
            .FirstOrDefault(r => r.Id == id);
        if (reservation is null)
            throw new NotFoundException("Reservation not found");
        _dbContext.Reservations.Remove(reservation);
        _dbContext.SaveChanges();
    }

    public void Update(int id, UpdateReservationDto dto, TeslaCar teslaCar)
    {
        var reservation = _dbContext
            .Reservations
            .FirstOrDefault(r => r.Id == id);
        if (reservation is null)
            throw new NotFoundException("Reservation not found");
        reservation.TeslaCarId = dto.TeslaCarId;
        reservation.StartDate = dto.StartDate;
        reservation.EndDate = dto.EndDate;
        reservation.TotalCost = CalculatePrice(teslaCar.DailyRate, dto.StartDate, dto.EndDate);
        _dbContext.SaveChanges();
    }

    public IEnumerable<ReservationDto> GetAll()
    {
        var reservations = _dbContext.Reservations
            .Include(r => r.TeslaCar)
            .Include(r => r.User)
            .ToList();
        var reservationsDtos = _mapper.Map<List<ReservationDto>>(reservations);
        return reservationsDtos;
    }

    public decimal CalculatePrice(decimal dailyRate, DateTime startDate, DateTime endDate)
    {
        var days = (endDate - startDate).Days;
        var result = dailyRate * days;
        return result;
    }
}