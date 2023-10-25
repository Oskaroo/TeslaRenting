using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TeslaRenting.Data.Entity;
using TeslaRenting.Data.Model;
using TeslaRenting.Data.Model.Authenticator;
using TeslaRenting.Data.Model.Validator;
using TeslaRenting.Exception;
using TeslaRenting.Service.Interface;

namespace TeslaRenting.Service;

public class UserService : IUserService
{
    private readonly TeslaRentingDbContext _dbContext;
    private readonly IMapper _mapper;
    private readonly AuthenticationSettings _authenticationSettings;

    public UserService(TeslaRentingDbContext dbContext,IMapper mapper, AuthenticationSettings authenticationSettings)
    {
        _dbContext = dbContext;
        _mapper = mapper;
        _authenticationSettings = authenticationSettings;
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

    public string GenerateJwt(LoginDto dto)
    {
        var user = _dbContext.Users
            .FirstOrDefault(u => u.Email == dto.Email);
        if (user is null) throw new BadRequestException("Invalid username or password");
        var result = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
        if (result == false)
        {
            throw new BadRequestException("Invalid email or password");
        }
        var claims = new List<Claim>()
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"),
            new Claim("DateOfBirth", user.DateOfBirth.Value.ToString("yyyy-MM-dd")),
        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey));
        var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expires = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);
        
        var token = new JwtSecurityToken(
            _authenticationSettings.JwtIssuer,
            _authenticationSettings.JwtIssuer,
            claims,
            expires: expires,
            signingCredentials: cred
        );
        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.WriteToken(token);
    }

    public void Delete(int id)
    {
        var user = _dbContext.Users.FirstOrDefault(u => u.Id == id);
        if (user is null)
            throw new NotFoundException("User not found");
        _dbContext.Users.Remove(user);
        _dbContext.SaveChanges();
    }

    public void Assign(AssignRoleDto dto, int id)
    {
        var user = _dbContext.Users.FirstOrDefault(u => u.Id == id);
        if (user is null)
            throw new NotFoundException("User not found");
        user.Role = dto.Role;
        _dbContext.SaveChanges();
    }
}