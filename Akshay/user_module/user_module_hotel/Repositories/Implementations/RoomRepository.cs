using Microsoft.EntityFrameworkCore;
using user_module_hotel.Data;
using user_module_hotel.Models;
using user_module_hotel.Repositories.Interfaces;

namespace user_module_hotel.Repositories.Implementations
{
    public class RoomRepository : IRoomRepository
    {
        private readonly AppDbContext _context;

        public RoomRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Room>> GetByHotelIdAsync(int hotelId)
        {
            return await _context.Rooms
                .Where(r => r.HotelId == hotelId && r.Status == "Active")
                .ToListAsync();
        }

        public async Task<Room?> GetByIdAsync(int roomId)
        {
            return await _context.Rooms.FirstOrDefaultAsync(r => r.RoomId == roomId);
        }

        public async Task<Room> UpdateAsync(Room room)
        {
            _context.Rooms.Update(room);
            await _context.SaveChangesAsync();
            return room;
        }
    }
}
