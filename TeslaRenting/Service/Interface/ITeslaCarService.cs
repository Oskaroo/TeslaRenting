using TeslaRenting.Data.Model;

namespace TeslaRenting.Service.Interface;

public interface ITeslaCarService
{ 
        Task<IEnumerable<TeslaCarDto>> GetAll(); 
        Task<TeslaCarDto> GetTeslaCarById(int id);
        Task<int> Create(CreateTeslaCarDto dto);
        Task Update(int id, UpdateTeslaCarDto dto);
        Task Delete(int id);
}