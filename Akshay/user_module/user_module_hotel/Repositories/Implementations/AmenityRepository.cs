using Microsoft.EntityFrameworkCore;
using user_module_hotel.Data;
using user_module_hotel.Models;
using user_module_hotel.Repositories.Interfaces;

namespace user_module_hotel.Repositories.Implementations
{
    public class AmenityRepository : IAmenityRepository
    {
        private readonly AppDbContext _context;

        public AmenityRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Amenity>> GetAllAsync()
        {
            return await _context.Amenities.ToListAsync();
        }
    }
}
