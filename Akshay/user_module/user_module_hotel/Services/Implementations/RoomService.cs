using user_module_hotel.DTOs.Room;
using user_module_hotel.Repositories.Interfaces;
using user_module_hotel.Services.Interfaces;

namespace user_module_hotel.Services.Implementations
{
    public class RoomService : IRoomService
    {
        private readonly IRoomRepository _roomRepository;

        public RoomService(IRoomRepository roomRepository)
        {
            _roomRepository = roomRepository;
        }

        public async Task<List<RoomResponseDto>> GetRoomsByHotelIdAsync(int hotelId)
        {
            var rooms = await _roomRepository.GetByHotelIdAsync(hotelId);
            return rooms.Select(r => MapToDto(r)).ToList();
        }

        private RoomResponseDto MapToDto(Models.Room room)
        {
            return new RoomResponseDto
            {
                RoomId = room.RoomId,
                HotelId = room.HotelId,
                RoomType = room.RoomType,
                PricePerNight = room.PricePerNight,
                Capacity = room.Capacity,
                AvailableRooms = room.AvailableRooms,
                Description = room.Description,
                Status = room.Status
            };
        }
    }
}
