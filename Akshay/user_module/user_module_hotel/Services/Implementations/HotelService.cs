using user_module_hotel.DTOs.Hotel;
using user_module_hotel.Repositories.Interfaces;
using user_module_hotel.Services.Interfaces;

namespace user_module_hotel.Services.Implementations
{
    public class HotelService : IHotelService
    {
        private readonly IHotelRepository _hotelRepository;

        public HotelService(IHotelRepository hotelRepository)
        {
            _hotelRepository = hotelRepository;
        }

        public async Task<List<HotelResponseDto>> GetApprovedHotelsAsync()
        {
            var hotels = await _hotelRepository.GetApprovedAsync();
            return hotels.Select(h => MapToDto(h)).ToList();
        }

        public async Task<List<HotelResponseDto>> SearchHotelsAsync(string? city, string? roomType, decimal? minPrice, decimal? maxPrice)
        {
            var hotels = await _hotelRepository.SearchAsync(city, roomType, minPrice, maxPrice);
            return hotels.Select(h => MapToDto(h)).ToList();
        }

        public async Task<HotelResponseDto?> GetHotelByIdAsync(int hotelId)
        {
            var hotel = await _hotelRepository.GetByIdAsync(hotelId);
            return hotel == null ? null : MapToDto(hotel);
        }

        private HotelResponseDto MapToDto(Models.Hotel hotel)
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
                ManagerName = string.Empty,
                Amenities = hotel.HotelAmenities.Select(ha => ha.Amenity.Name).ToList(),
                CreatedAt = hotel.CreatedAt
            };
        }
    }
}
