using AutoMapper;
using TeslaRenting.Entity;
using TeslaRenting.Model;

namespace TeslaRenting.MappingProfile;

public class TeslaRatingMappingProfile : Profile
{
    public TeslaRatingMappingProfile()
    {
        CreateMap<TeslaCar, TeslaCarDto>();
        CreateMap<User, RegisterUserDto>();
        CreateMap<Reservation, ReservationDto>();
        CreateMap<CreateReservationDto, Reservation>();
    }
}