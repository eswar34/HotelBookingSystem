using HotelBookingSystem.API.Models;

namespace HotelBookingSystem.API.Repositories.Interfaces
{
    public interface IRoomRepository
    {
        Task<List<Room>> GetByHotelIdAsync(int hotelId);
        Task<Room?> GetByIdAsync(int roomId);
        Task<Room> CreateAsync(Room room);
        Task<Room> UpdateAsync(Room room);
    }
}