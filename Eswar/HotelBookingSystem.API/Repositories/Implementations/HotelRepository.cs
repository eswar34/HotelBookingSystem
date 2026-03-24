using HotelBookingSystem.API.Data;
using HotelBookingSystem.API.Models;
using HotelBookingSystem.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HotelBookingSystem.API.Repositories.Implementations
{
    public class HotelRepository : IHotelRepository
    {
        private readonly AppDbContext _context;

        public HotelRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Hotel?> GetByManagerIdAsync(int managerId)
        {
            return await _context.Hotels.FirstOrDefaultAsync(h => h.ManagerId == managerId);
        }

        public async Task<List<Hotel>> GetActiveHotelsWithRoomsAsync()
        {
            return await _context.Hotels
                .Where(h => h.Status == "Active")
                .Include(h => h.Rooms)
                .ToListAsync();
        }
    }
}
