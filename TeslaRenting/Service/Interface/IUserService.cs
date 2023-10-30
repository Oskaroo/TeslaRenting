using TeslaRenting.Data.Model;
using TeslaRenting.Data.Model.Validator;

namespace TeslaRenting.Service.Interface;

public interface IUserService
{
        Task<UserDto> GetUserById(int id);
        Task<IEnumerable<UserDto>> GetAll();
        Task RegisterUser(RegisterUserDto dto);
        Task<string> GenerateJwt(LoginDto dto);
        Task Delete(int id);
        Task Assign(AssignRoleDto dto, int id);
}