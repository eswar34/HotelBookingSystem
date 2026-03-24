using user_module_hotel.DTOs.Booking;

namespace user_module_hotel.Services.Interfaces
{
    public interface IBookingService
    {
        Task<BookingResponseDto> CreateBookingAsync(int customerId, CreateBookingDto dto);
        Task<List<BookingResponseDto>> GetMyBookingsAsync(int customerId);
        Task<bool> CancelBookingAsync(int bookingId, int customerId);
    }
}
