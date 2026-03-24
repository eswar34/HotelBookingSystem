using HotelBookingSystem.API.DTOs.Amenity;
using HotelBookingSystem.API.Models;
using HotelBookingSystem.API.Repositories.Interfaces;
using HotelBookingSystem.API.Services.Interfaces;

namespace HotelBookingSystem.API.Services.Implementations
{
    public class AmenityService : IAmenityService
    {
        private readonly IAmenityRepository _amenityRepository;

        public AmenityService(IAmenityRepository amenityRepository)
        {
            _amenityRepository = amenityRepository;
        }

        public async Task<List<AmenityResponseDto>> GetAllAsync()
        {
            var amenities = await _amenityRepository.GetAllAsync();
            return amenities.Select(a => new AmenityResponseDto
            {
                AmenityId = a.AmenityId,
                Name = a.Name
            }).ToList();
        }

        public async Task<AmenityResponseDto> CreateAsync(CreateAmenityDto dto)
        {
            var amenity = new Amenity { Name = dto.Name };
            var created = await _amenityRepository.CreateAsync(amenity);
            return new AmenityResponseDto
            {
                AmenityId = created.AmenityId,
                Name = created.Name
            };
        }
    }
}