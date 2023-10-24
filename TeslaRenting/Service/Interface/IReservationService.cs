using TeslaRenting.Data.Entity;
using TeslaRenting.Data.Model;

namespace TeslaRenting.Service.Interface;

public interface IReservationService
{ 
        ReservationDto GetReservationById(int id);
        int Create(CreateReservationDto dto);
        void Delete(int id);
        void Update(int id, UpdateReservationDto dto, TeslaCar teslaCar);
        IEnumerable<ReservationDto> GetAll();
}