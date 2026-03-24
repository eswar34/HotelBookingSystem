using user_module_hotel.DTOs.Booking;
using user_module_hotel.Models;
using user_module_hotel.Repositories.Interfaces;
using user_module_hotel.Services.Interfaces;

namespace user_module_hotel.Services.Implementations
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IRoomRepository _roomRepository;

        public BookingService(IBookingRepository bookingRepository, IRoomRepository roomRepository)
        {
            _bookingRepository = bookingRepository;
            _roomRepository = roomRepository;
        }

        public async Task<BookingResponseDto> CreateBookingAsync(int customerId, CreateBookingDto dto)
        {
            var today = DateTime.UtcNow.Date;
            if (dto.CheckInDate.Date < today)
                throw new Exception("Check-in date must be today or a future date");

            var room = await _roomRepository.GetByIdAsync(dto.RoomId);
            if (room == null)
                throw new Exception("Room not found");

            if (room.AvailableRooms <= 0)
                throw new Exception("No available rooms");

            var nights = (int)(dto.CheckOutDate - dto.CheckInDate).TotalDays;
            if (nights <= 0)
                throw new Exception("Invalid checkout date");

            var totalAmount = room.PricePerNight * nights;

            var booking = new Booking
            {
                CustomerId = customerId,
                RoomId = dto.RoomId,
                HotelId = dto.HotelId,
                CheckInDate = dto.CheckInDate,
                CheckOutDate = dto.CheckOutDate,
                TotalAmount = totalAmount,
                Status = "Confirmed"
            };

            room.AvailableRooms--;
            await _roomRepository.UpdateAsync(room);
            await _bookingRepository.CreateAsync(booking);

            return MapToDto(booking, room);
        }

        public async Task<List<BookingResponseDto>> GetMyBookingsAsync(int customerId)
        {
            var bookings = await _bookingRepository.GetByCustomerIdAsync(customerId);
            return bookings.Select(b => MapToDto(b, b.Room)).ToList();
        }

        public async Task<bool> CancelBookingAsync(int bookingId, int customerId)
        {
            var booking = await _bookingRepository.GetByIdAsync(bookingId);
            if (booking == null || booking.CustomerId != customerId)
                return false;

            if (booking.Status == "Cancelled")
                return false;

            booking.Status = "Cancelled";
            await _bookingRepository.UpdateAsync(booking);

            var room = await _roomRepository.GetByIdAsync(booking.RoomId);
            if (room != null)
            {
                room.AvailableRooms++;
                await _roomRepository.UpdateAsync(room);
            }

            return true;
        }

        private BookingResponseDto MapToDto(Booking booking, Room room)
        {
            return new BookingResponseDto
            {
                BookingId = booking.BookingId,
                RoomId = booking.RoomId,
                HotelId = booking.HotelId,
                HotelName = booking.Hotel?.HotelName ?? string.Empty,
                RoomType = room.RoomType,
                CustomerName = booking.Customer?.FullName ?? string.Empty,
                CheckInDate = booking.CheckInDate,
                CheckOutDate = booking.CheckOutDate,
                TotalAmount = booking.TotalAmount,
                Status = booking.Status,
                CreatedAt = booking.CreatedAt
            };
        }
    }
}
