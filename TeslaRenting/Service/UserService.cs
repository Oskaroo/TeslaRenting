using System.Collections;
using System.Transactions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TeslaRenting.Entity;
using TeslaRenting.Exception;
using TeslaRenting.MiddleWare;
using TeslaRenting.Model;

namespace TeslaRenting.Service;
public interface IUserService
{
    UserDto GetUserById(int id);
    IEnumerable<UserDto> GetAll();
    void RegisterUser(RegisterUserDto dto);
}

public class UserService : IUserService
{
    private readonly TeslaRentingDbContext _dbContext;
    private readonly IMapper _mapper;

    public UserService(TeslaRentingDbContext dbContext,IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }
    public UserDto GetUserById(int id)
    {
        var users = _dbContext.Users
            .Include(u => u.UserAddress)
            .Include(u => u.Reservations)
            .FirstOrDefault(u => u.Id == id);
        
        if(users is null) 
            throw new NotFoundException("Reservation not found");
        
        var result = _mapper.Map<UserDto>(users);
        return result;
    }

    public IEnumerable<UserDto> GetAll()
    {
        var users = _dbContext.Users
            .Include(u => u.UserAddress)
            .Include(u => u.Reservations)
            .ToList();
        var usersDtos = _mapper.Map<List<UserDto>>(users);
        return usersDtos;
    }

    public void RegisterUser(RegisterUserDto dto)
    {
        using var transaction = _dbContext.Database.BeginTransaction();
        try
        {
            var address = new Address()
            {
                Country = dto.Country,
                City = dto.City,
                Street = dto.Street,
                PostalCode = dto.PostalCode
            };
            var newUser = new User()
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                DateOfBirth = dto.DateOfBirth,
                Email = dto.Email,
                Phone = dto.Phone,
                UserAddress = address
            };
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            newUser.PasswordHash = hashedPassword;
            _dbContext.Users.Add(newUser);
            _dbContext.SaveChanges();
            transaction.Commit();
        }
        catch (System.Exception e)
        {
            transaction.Rollback();
            throw new BadRequestException("Error while creating user");
        }
    }
}