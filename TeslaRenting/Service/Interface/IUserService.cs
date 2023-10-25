using TeslaRenting.Data.Model;
using TeslaRenting.Data.Model.Validator;

namespace TeslaRenting.Service.Interface;

public interface IUserService
{
        UserDto GetUserById(int id);
        IEnumerable<UserDto> GetAll();
        void RegisterUser(RegisterUserDto dto);
        string GenerateJwt(LoginDto dto);
        void Delete(int id);
        void Assign(AssignRoleDto dto, int id);
}