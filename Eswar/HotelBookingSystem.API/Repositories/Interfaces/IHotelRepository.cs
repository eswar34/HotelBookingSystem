using HotelBookingSystem.API.Models;

namespace HotelBookingSystem.API.Repositories.Interfaces
{
    public interface IHotelRepository
    {
        Task<Hotel?> GetByManagerIdAsync(int managerId);
        Task<List<Hotel>> GetActiveHotelsWithRoomsAsync();
    }
}
