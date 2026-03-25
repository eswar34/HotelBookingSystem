using HotelBookingSystem.API.DTOs.Booking;

namespace HotelBookingSystem.API.Services.Interfaces
{
    public interface IBookingService
    {
        Task<List<BookingResponseDto>> GetAllAsync();
        Task<List<BookingResponseDto>> GetMyBookingsAsync(int customerId);
        Task<List<BookingResponseDto>> GetHotelBookingsAsync(int managerId);
        Task<BookingResponseDto> GetByIdAsync(int bookingId);
        Task<BookingResponseDto> CreateAsync(int customerId, CreateBookingDto dto);
        Task<BookingResponseDto> CancelAsync(int customerId, int bookingId);
    }
}