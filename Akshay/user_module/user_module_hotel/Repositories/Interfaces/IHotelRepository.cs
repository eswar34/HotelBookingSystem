using user_module_hotel.Models;

namespace user_module_hotel.Repositories.Interfaces
{
    public interface IHotelRepository
    {
        Task<List<Hotel>> GetApprovedAsync();
        Task<List<Hotel>> SearchAsync(string? city, string? roomType, decimal? minPrice, decimal? maxPrice);
        Task<Hotel?> GetByIdAsync(int hotelId);
    }
}
