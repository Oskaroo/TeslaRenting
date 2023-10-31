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
    public async Task<UserDto> GetUserById(int id)
    {
        var users =await _dbContext.Users
            .Include(u => u.UserAddress)
            .Include(u => u.Reservations)
            .FirstOrDefaultAsync(u => u.Id == id);
        
        if(users is null) 
            throw new NotFoundException("Reservation not found");
        
        var result = _mapper.Map<UserDto>(users);
        return result;
        
    }

    public async Task<IEnumerable<UserDto>> GetAll()
    {
        var users =await _dbContext.Users
            .Include(u => u.UserAddress)
            .Include(u => u.Reservations)
            .ToListAsync();
        var usersDtos = _mapper.Map<List<UserDto>>(users);
        return usersDtos;
    }

    public async Task RegisterUser(RegisterUserDto dto)
    {
        try
        {
            var address = new Address()
            {
                Country = dto.Country,
                City = dto.City,
                Street = dto.Street,
                PostalCode = dto.PostalCode
            };
            await _dbContext.Addresses.AddAsync(address);
            var newUser = new User()
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                DateOfBirth = dto.DateOfBirth,
                Email = dto.Email,
                Phone = dto.Phone,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                UserAddress = address
            };
           await _dbContext.Users.AddAsync(newUser);
            await _dbContext.SaveChangesAsync();
        }
        catch (System.Exception e)
        {
            throw new BadRequestException("Error while creating user");
        }
    }

    public async Task<string> GenerateJwt(LoginDto dto)
    {
        var user = await _dbContext.Users
            .Include(u => u.UserRole)
            .FirstOrDefaultAsync(u => u.Email == dto.Email);
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
            new Claim(ClaimTypes.Role, $"{user.UserRole.Name}"),
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

    public async Task Delete(int id)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (user is null)
            throw new NotFoundException("User not found");
        _dbContext.Users.Remove(user);
        await _dbContext.SaveChangesAsync();
    }

    public async Task Assign(AssignRoleDto dto, int id)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (user is null)
            throw new NotFoundException("User not found");
        user.UserRoleId = dto.UserRoleId;
        await _dbContext.SaveChangesAsync();
    }
}