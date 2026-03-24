using user_module_hotel.DTOs.Room;

namespace user_module_hotel.Services.Interfaces
{
    public interface IRoomService
    {
        Task<List<RoomResponseDto>> GetRoomsByHotelIdAsync(int hotelId);
    }
}
