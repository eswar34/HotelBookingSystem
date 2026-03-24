using HotelBookingSystem.API.Data;
using HotelBookingSystem.API.Models;
using HotelBookingSystem.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HotelBookingSystem.API.Repositories.Implementations
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
                .Where(r => r.HotelId == hotelId)
                .ToListAsync();
        }

        public async Task<Room?> GetByIdAsync(int roomId)
        {
            return await _context.Rooms.FindAsync(roomId);
        }

        public async Task<Room> CreateAsync(Room room)
        {
            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();
            return room;
        }

        public async Task<Room> UpdateAsync(Room room)
        {
            _context.Rooms.Update(room);
            await _context.SaveChangesAsync();
            return room;
        }
    }
}