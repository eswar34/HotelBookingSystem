using Microsoft.EntityFrameworkCore;
using user_module_hotel.Data;
using user_module_hotel.Models;
using user_module_hotel.Repositories.Interfaces;

namespace user_module_hotel.Repositories.Implementations
{
    public class BookingRepository : IBookingRepository
    {
        private readonly AppDbContext _context;

        public BookingRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Booking>> GetByCustomerIdAsync(int customerId)
        {
            return await _context.Bookings
                .Where(b => b.CustomerId == customerId)
                .Include(b => b.Hotel)
                .Include(b => b.Room)
                .ToListAsync();
        }

        public async Task<Booking?> GetByIdAsync(int bookingId)
        {
            return await _context.Bookings
                .Include(b => b.Hotel)
                .Include(b => b.Room)
                .Include(b => b.Customer)
                .FirstOrDefaultAsync(b => b.BookingId == bookingId);
        }

        public async Task<Booking> CreateAsync(Booking booking)
        {
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            return booking;
        }

        public async Task<Booking> UpdateAsync(Booking booking)
        {
            _context.Bookings.Update(booking);
            await _context.SaveChangesAsync();
            return booking;
        }
    }
}
