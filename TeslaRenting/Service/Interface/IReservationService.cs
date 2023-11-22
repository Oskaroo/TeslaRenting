using TeslaRenting.Data.Entity;
using TeslaRenting.Data.Model;

namespace TeslaRenting.Service.Interface;

public interface IReservationService
{
        Task<ReservationDto> GetReservationById(int id);
        Task<int> Create(CreateReservationDto dto);
        Task Delete(int id);
        Task Update(int id, UpdateReservationDto dto);
        Task<IEnumerable<ReservationDto>> GetAll(CancellationToken cancellationToken);
}