using user_module_hotel.DTOs.Amenity;
using user_module_hotel.Repositories.Interfaces;
using user_module_hotel.Services.Interfaces;

namespace user_module_hotel.Services.Implementations
{
    public class AmenityService : IAmenityService
    {
        private readonly IAmenityRepository _amenityRepository;

        public AmenityService(IAmenityRepository amenityRepository)
        {
            _amenityRepository = amenityRepository;
        }

        public async Task<List<AmenityResponseDto>> GetAllAmenitiesAsync()
        {
            var amenities = await _amenityRepository.GetAllAsync();
            return amenities.Select(a => MapToDto(a)).ToList();
        }

        private AmenityResponseDto MapToDto(Models.Amenity amenity)
        {
            return new AmenityResponseDto
            {
                AmenityId = amenity.AmenityId,
                Name = amenity.Name
            };
        }
    }
}
