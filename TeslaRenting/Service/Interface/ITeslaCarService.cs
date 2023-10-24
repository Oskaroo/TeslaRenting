using TeslaRenting.Data.Model;

namespace TeslaRenting.Service.Interface;

public interface ITeslaCarService
{ 
        IEnumerable<TeslaCarDto> GetAll(); 
        TeslaCarDto GetTeslaCarById(int id);
        int Create(CreateTeslaCarDto dto);
        void Update(int id, UpdateTeslaCarDto dto);
        void Delete(int id);
}