using HotelBookingSystem.API.DTOs.Room;

namespace HotelBookingSystem.API.Services.Interfaces
{
    public interface IRoomService
    {
        Task<List<RoomResponseDto>> GetByHotelIdAsync(int hotelId);
        Task<RoomResponseDto> CreateAsync(int managerId, CreateRoomDto dto);
        Task<RoomResponseDto> UpdateAsync(int managerId, int roomId, UpdateRoomDto dto);
    }
}