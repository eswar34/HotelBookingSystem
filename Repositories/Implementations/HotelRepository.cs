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

        public async Task<List<Hotel>> GetAllAsync()
        {
            return await _context.Hotels
                .Include(h => h.Manager)
                .Include(h => h.HotelAmenities).ThenInclude(ha => ha.Amenity)
                .ToListAsync();
        }

        public async Task<List<Hotel>> GetApprovedAsync()
        {
            return await _context.Hotels
                .Where(h => h.Status == "Approved")
                .Include(h => h.Manager)
                .Include(h => h.HotelAmenities).ThenInclude(ha => ha.Amenity)
                .Include(h => h.Rooms)
                .ToListAsync();
        }

        public async Task<List<Hotel>> SearchAsync(string? city, string? roomType, decimal? minPrice, decimal? maxPrice)
        {
            var query = _context.Hotels
                .Where(h => h.Status == "Approved")
                .Include(h => h.Manager)
                .Include(h => h.HotelAmenities).ThenInclude(ha => ha.Amenity)
                .Include(h => h.Rooms)
                .AsQueryable();

            if (!string.IsNullOrEmpty(city))
                query = query.Where(h => h.City.ToLower().Contains(city.ToLower()));

            if (!string.IsNullOrEmpty(roomType))
                query = query.Where(h => h.Rooms.Any(r => r.RoomType.ToLower() == roomType.ToLower()));

            if (minPrice.HasValue)
                query = query.Where(h => h.Rooms.Any(r => r.PricePerNight >= minPrice.Value));

            if (maxPrice.HasValue)
                query = query.Where(h => h.Rooms.Any(r => r.PricePerNight <= maxPrice.Value));

            return await query.ToListAsync();
        }

        public async Task<Hotel?> GetByIdAsync(int hotelId)
        {
            return await _context.Hotels
                .Include(h => h.Manager)
                .Include(h => h.HotelAmenities).ThenInclude(ha => ha.Amenity)
                .Include(h => h.Rooms)
                .FirstOrDefaultAsync(h => h.HotelId == hotelId);
        }

        public async Task<Hotel?> GetByManagerIdAsync(int managerId)
        {
            return await _context.Hotels
                .Include(h => h.Manager)
                .Include(h => h.HotelAmenities).ThenInclude(ha => ha.Amenity)
                .Include(h => h.Rooms)
                .FirstOrDefaultAsync(h => h.ManagerId == managerId);
        }

        public async Task<Hotel> CreateAsync(Hotel hotel)
        {
            _context.Hotels.Add(hotel);
            await _context.SaveChangesAsync();
            return hotel;
        }

        public async Task<Hotel> UpdateAsync(Hotel hotel)
        {
            _context.Hotels.Update(hotel);
            await _context.SaveChangesAsync();
            return hotel;
        }

        public async Task<bool> AddAmenityAsync(int hotelId, int amenityId)
        {
            _context.HotelAmenities.Add(new HotelAmenity { HotelId = hotelId, AmenityId = amenityId });
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> AmenityAlreadyAddedAsync(int hotelId, int amenityId)
        {
            return await _context.HotelAmenities
                .AnyAsync(ha => ha.HotelId == hotelId && ha.AmenityId == amenityId);
        }
    }
}