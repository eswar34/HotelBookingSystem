using HotelBookingSystem.API.Models;

namespace HotelBookingSystem.API.Repositories.Interfaces
{
    public interface IBookingRepository
    {
        Task<List<Booking>> GetAllAsync();
        Task<List<Booking>> GetByCustomerIdAsync(int customerId);
        Task<List<Booking>> GetByHotelIdAsync(int hotelId);
        Task<Booking?> GetByIdAsync(int bookingId);
        Task<Booking> CreateAsync(Booking booking);
        Task<Booking> UpdateAsync(Booking booking);
    }
}