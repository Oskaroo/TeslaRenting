using AutoMapper;
using TeslaRenting.Entity;
using TeslaRenting.Model;

namespace TeslaRenting.MappingProfile;

public class TeslaRatingMappingProfile : Profile
{
    public TeslaRatingMappingProfile()
    {
        CreateMap<TeslaCar, TeslaCarDto>();
        CreateMap<User, RegisterUserDto>()
            .ForMember(u => u.Country, c => c.MapFrom(s => s.UserAddress.Country))
            .ForMember(u => u.City, c => c.MapFrom(s => s.UserAddress.City))
            .ForMember(u => u.Street, c => c.MapFrom(s => s.UserAddress.Street))
            .ForMember(u => u.PostalCode, c => c.MapFrom(s => s.UserAddress.PostalCode));
        CreateMap<Reservation, ReservationDto>();
        CreateMap<CreateReservationDto, Reservation>();
        CreateMap<UpdateReservationDto, Reservation>();
        
        CreateMap<CreateTeslaCarDto, TeslaCar>();
        CreateMap<UpdateTeslaCarDto, TeslaCar>();
        
        
        
        CreateMap<UserDto, User>();


    }
}