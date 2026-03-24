using HotelBookingSystem.API.DTOs.Hotel;

namespace HotelBookingSystem.API.Services.Interfaces
{
    public interface IHotelService
    {
        Task<List<HotelResponseDto>> GetAllAsync();
        Task<List<HotelResponseDto>> GetApprovedAsync();
        Task<List<HotelResponseDto>> SearchAsync(string? city, string? roomType, decimal? minPrice, decimal? maxPrice);
        Task<HotelResponseDto> GetByIdAsync(int hotelId);
        Task<HotelResponseDto> GetMyHotelAsync(int managerId);
        Task<HotelResponseDto> CreateAsync(int managerId, CreateHotelDto dto);
        Task<HotelResponseDto> UpdateAsync(int managerId, int hotelId, UpdateHotelDto dto);
        Task<HotelResponseDto> ApproveAsync(int hotelId);
        Task<bool> AddAmenityAsync(int managerId, int amenityId);
    }
}