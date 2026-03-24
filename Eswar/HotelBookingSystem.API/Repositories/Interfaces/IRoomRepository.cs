using HotelBookingSystem.API.Models;

namespace HotelBookingSystem.API.Repositories.Interfaces
{
    public interface IRoomRepository
    {
        Task<Room?> GetByIdAsync(int roomId);
        Task<Room> UpdateAsync(Room room);
    }
}
