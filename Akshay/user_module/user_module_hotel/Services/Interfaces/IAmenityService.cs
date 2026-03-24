using user_module_hotel.DTOs.Amenity;

namespace user_module_hotel.Services.Interfaces
{
    public interface IAmenityService
    {
        Task<List<AmenityResponseDto>> GetAllAmenitiesAsync();
    }
}
