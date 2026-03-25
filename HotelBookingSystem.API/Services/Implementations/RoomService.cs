using HotelBookingSystem.API.DTOs.Room;
using HotelBookingSystem.API.Models;
using HotelBookingSystem.API.Repositories.Interfaces;
using HotelBookingSystem.API.Services.Interfaces;

namespace HotelBookingSystem.API.Services.Implementations
{
    public class RoomService : IRoomService
    {
        private readonly IRoomRepository _roomRepository;
        private readonly IHotelRepository _hotelRepository;

        public RoomService(IRoomRepository roomRepository, IHotelRepository hotelRepository)
        {
            _roomRepository = roomRepository;
            _hotelRepository = hotelRepository;
        }

        public async Task<List<RoomResponseDto>> GetByHotelIdAsync(int hotelId)
        {
            var rooms = await _roomRepository.GetByHotelIdAsync(hotelId);
            return rooms.Select(MapToDto).ToList();
        }

        public async Task<RoomResponseDto> CreateAsync(int managerId, CreateRoomDto dto)
        {
            var hotel = await _hotelRepository.GetByManagerIdAsync(managerId)
                ?? throw new KeyNotFoundException("No hotel found for this manager.");

            if (hotel.Status != "Approved")
                throw new ArgumentException("Hotel must be approved before adding rooms.");

            var room = new Room
            {
                HotelId = hotel.HotelId,
                RoomType = dto.RoomType,
                PricePerNight = dto.PricePerNight,
                Capacity = dto.Capacity,
                AvailableRooms = dto.AvailableRooms,
                Description = dto.Description,
                Status = "Active"
            };

            var created = await _roomRepository.CreateAsync(room);
            return MapToDto(created);
        }

        public async Task<RoomResponseDto> UpdateAsync(int managerId, int roomId, UpdateRoomDto dto)
        {
            var hotel = await _hotelRepository.GetByManagerIdAsync(managerId)
                ?? throw new KeyNotFoundException("No hotel found for this manager.");

            var room = await _roomRepository.GetByIdAsync(roomId)
                ?? throw new KeyNotFoundException("Room not found.");

            if (room.HotelId != hotel.HotelId)
                throw new UnauthorizedAccessException("You can only update rooms in your own hotel.");

            room.RoomType = dto.RoomType;
            room.PricePerNight = dto.PricePerNight;
            room.Capacity = dto.Capacity;
            room.AvailableRooms = dto.AvailableRooms;
            room.Description = dto.Description;
            room.Status = dto.Status;

            var updated = await _roomRepository.UpdateAsync(room);
            return MapToDto(updated);
        }

        private static RoomResponseDto MapToDto(Room room)
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