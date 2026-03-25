using user_module_hotel.Models;

namespace user_module_hotel.Repositories.Interfaces
{
    public interface IBookingRepository
    {
        Task<List<Booking>> GetByCustomerIdAsync(int customerId);
        Task<Booking?> GetByIdAsync(int bookingId);
        Task<Booking> CreateAsync(Booking booking);
        Task<Booking> UpdateAsync(Booking booking);
    }
}
