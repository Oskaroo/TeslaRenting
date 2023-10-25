using AutoMapper;
using TeslaRenting.Data.Entity;
using TeslaRenting.Data.Model;

namespace TeslaRenting.Data.MappingProfile;

public class TeslaRatingMappingProfile : Profile
{
    public TeslaRatingMappingProfile()
    {
        CreateMap<TeslaCar, TeslaCarDto>();
        CreateMap<Reservation, ReservationDto>();
        CreateMap<CreateReservationDto, Reservation>();
        CreateMap<UpdateReservationDto, Reservation>();
        
        CreateMap<CreateTeslaCarDto, TeslaCar>();
        CreateMap<UpdateTeslaCarDto, TeslaCar>();

        CreateMap<RegisterUserDto, User>().ForMember(u => u.UserAddress, c => c.MapFrom(dto => new Address()
        {
            Country = dto.Country,
            City = dto.City,
            Street = dto.Street,
            PostalCode = dto.PostalCode
        }));
        
        CreateMap<User, UserDto>();
        CreateMap<LoginDto, User>();


    }
}