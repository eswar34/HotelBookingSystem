using HotelBookingSystem.API.DTOs.Amenity;

namespace HotelBookingSystem.API.Services.Interfaces
{
    public interface IAmenityService
    {
        Task<List<AmenityResponseDto>> GetAllAsync();
        Task<AmenityResponseDto> CreateAsync(CreateAmenityDto dto);
    }
}