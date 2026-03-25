using HotelBookingSystem.API.DTOs.Hotel;
using HotelBookingSystem.API.Models;
using HotelBookingSystem.API.Repositories.Interfaces;
using HotelBookingSystem.API.Services.Interfaces;

namespace HotelBookingSystem.API.Services.Implementations
{
    public class HotelService : IHotelService
    {
        private readonly IHotelRepository _hotelRepository;
        private readonly IAmenityRepository _amenityRepository;

        public HotelService(IHotelRepository hotelRepository, IAmenityRepository amenityRepository)
        {
            _hotelRepository = hotelRepository;
            _amenityRepository = amenityRepository;
        }

        public async Task<List<HotelResponseDto>> GetAllAsync()
        {
            var hotels = await _hotelRepository.GetAllAsync();
            return hotels.Select(MapToDto).ToList();
        }

        public async Task<List<HotelResponseDto>> GetApprovedAsync()
        {
            var hotels = await _hotelRepository.GetApprovedAsync();
            return hotels.Select(MapToDto).ToList();
        }

        public async Task<List<HotelResponseDto>> SearchAsync(string? city, string? roomType, decimal? minPrice, decimal? maxPrice)
        {
            var hotels = await _hotelRepository.SearchAsync(city, roomType, minPrice, maxPrice);
            return hotels.Select(MapToDto).ToList();
        }

        public async Task<HotelResponseDto> GetByIdAsync(int hotelId)
        {
            var hotel = await _hotelRepository.GetByIdAsync(hotelId)
                ?? throw new KeyNotFoundException("Hotel not found.");
            return MapToDto(hotel);
        }

        public async Task<HotelResponseDto> GetMyHotelAsync(int managerId)
        {
            var hotel = await _hotelRepository.GetByManagerIdAsync(managerId)
                ?? throw new KeyNotFoundException("No hotel found for this manager.");
            return MapToDto(hotel);
        }

        public async Task<HotelResponseDto> CreateAsync(int managerId, CreateHotelDto dto)
        {
            var existing = await _hotelRepository.GetByManagerIdAsync(managerId);
            if (existing != null)
                throw new ArgumentException("Manager already has a registered hotel.");

            var hotel = new Hotel
            {
                ManagerId = managerId,
                HotelName = dto.HotelName,
                City = dto.City,
                Location = dto.Location,
                Description = dto.Description,
                StarRating = dto.StarRating,
                Status = "Pending"
            };

            var created = await _hotelRepository.CreateAsync(hotel);
            return await GetByIdAsync(created.HotelId);
        }

        public async Task<HotelResponseDto> UpdateAsync(int managerId, int hotelId, UpdateHotelDto dto)
        {
            var hotel = await _hotelRepository.GetByIdAsync(hotelId)
                ?? throw new KeyNotFoundException("Hotel not found.");

            if (hotel.ManagerId != managerId)
                throw new UnauthorizedAccessException("You can only update your own hotel.");

            hotel.HotelName = dto.HotelName;
            hotel.City = dto.City;
            hotel.Location = dto.Location;
            hotel.Description = dto.Description;
            hotel.StarRating = dto.StarRating;

            await _hotelRepository.UpdateAsync(hotel);
            return await GetByIdAsync(hotel.HotelId);
        }

        public async Task<HotelResponseDto> ApproveAsync(int hotelId)
        {
            var hotel = await _hotelRepository.GetByIdAsync(hotelId)
                ?? throw new KeyNotFoundException("Hotel not found.");

            hotel.Status = "Approved";
            await _hotelRepository.UpdateAsync(hotel);
            return MapToDto(hotel);
        }

        public async Task<bool> AddAmenityAsync(int managerId, int amenityId)
        {
            var hotel = await _hotelRepository.GetByManagerIdAsync(managerId)
                ?? throw new KeyNotFoundException("No hotel found for this manager.");

            var amenity = await _amenityRepository.GetByIdAsync(amenityId)
                ?? throw new KeyNotFoundException("Amenity not found.");

            if (await _hotelRepository.AmenityAlreadyAddedAsync(hotel.HotelId, amenityId))
                throw new ArgumentException("Amenity already added to this hotel.");

            return await _hotelRepository.AddAmenityAsync(hotel.HotelId, amenityId);
        }

        private static HotelResponseDto MapToDto(Hotel hotel)
        {
            return new HotelResponseDto
            {
                HotelId = hotel.HotelId,
                HotelName = hotel.HotelName,
                City = hotel.City,
                Location = hotel.Location,
                Description = hotel.Description,
                StarRating = hotel.StarRating,
                Status = hotel.Status,
                ManagerName = hotel.Manager?.FullName ?? string.Empty,
                Amenities = hotel.HotelAmenities?.Select(ha => ha.Amenity.Name).ToList() ?? new(),
                CreatedAt = hotel.CreatedAt
            };
        }
    }
}