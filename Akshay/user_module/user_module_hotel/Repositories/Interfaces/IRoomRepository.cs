using user_module_hotel.Models;

namespace user_module_hotel.Repositories.Interfaces
{
    public interface IRoomRepository
    {
        Task<List<Room>> GetByHotelIdAsync(int hotelId);
        Task<Room?> GetByIdAsync(int roomId);
        Task<Room> UpdateAsync(Room room);
    }
}
