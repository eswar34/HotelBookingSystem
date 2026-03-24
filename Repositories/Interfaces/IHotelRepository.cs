using HotelBookingSystem.API.Models;

namespace HotelBookingSystem.API.Repositories.Interfaces
{
    public interface IHotelRepository
    {
        Task<List<Hotel>> GetAllAsync();
        Task<List<Hotel>> GetApprovedAsync();
        Task<List<Hotel>> SearchAsync(string? city, string? roomType, decimal? minPrice, decimal? maxPrice);
        Task<Hotel?> GetByIdAsync(int hotelId);
        Task<Hotel?> GetByManagerIdAsync(int managerId);
        Task<Hotel> CreateAsync(Hotel hotel);
        Task<Hotel> UpdateAsync(Hotel hotel);
        Task<bool> AddAmenityAsync(int hotelId, int amenityId);
        Task<bool> AmenityAlreadyAddedAsync(int hotelId, int amenityId);
    }
}