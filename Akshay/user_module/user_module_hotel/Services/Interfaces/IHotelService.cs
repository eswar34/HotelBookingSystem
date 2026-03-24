using user_module_hotel.DTOs.Hotel;

namespace user_module_hotel.Services.Interfaces
{
    public interface IHotelService
    {
        Task<List<HotelResponseDto>> GetApprovedHotelsAsync();
        Task<List<HotelResponseDto>> SearchHotelsAsync(string? city, string? roomType, decimal? minPrice, decimal? maxPrice);
        Task<HotelResponseDto?> GetHotelByIdAsync(int hotelId);
    }
}
