using HotelBookingSystem.API.Data;
using HotelBookingSystem.API.Models;
using HotelBookingSystem.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HotelBookingSystem.API.Repositories.Implementations
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

        public async Task<Amenity?> GetByIdAsync(int amenityId)
        {
            return await _context.Amenities.FindAsync(amenityId);
        }

        public async Task<Amenity> CreateAsync(Amenity amenity)
        {
            _context.Amenities.Add(amenity);
            await _context.SaveChangesAsync();
            return amenity;
        }
    }
}