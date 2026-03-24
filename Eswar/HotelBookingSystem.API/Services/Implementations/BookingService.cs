using HotelBookingSystem.API.DTOs.Booking;
using HotelBookingSystem.API.Models;
using HotelBookingSystem.API.Repositories.Interfaces;
using HotelBookingSystem.API.Services.Interfaces;

namespace HotelBookingSystem.API.Services.Implementations
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IRoomRepository _roomRepository;
        private readonly IHotelRepository _hotelRepository;

        public BookingService(IBookingRepository bookingRepository, IRoomRepository roomRepository, IHotelRepository hotelRepository)
        {
            _bookingRepository = bookingRepository;
            _roomRepository = roomRepository;
            _hotelRepository = hotelRepository;
        }

        public async Task<List<HotelBookingListDto>> GetHotelsForBookingAsync()
        {
            var hotels = await _hotelRepository.GetActiveHotelsWithRoomsAsync();

            return hotels.Select(h => new HotelBookingListDto
            {
                HotelId = h.HotelId,
                HotelName = h.HotelName,
                City = h.City,
                Location = h.Location,
                StarRating = h.StarRating,
                Rooms = h.Rooms
                    .Where(r => r.Status == "Active" && r.AvailableRooms > 0)
                    .Select(r => new RoomBookingListDto
                    {
                        RoomId = r.RoomId,
                        RoomType = r.RoomType,
                        PricePerNight = r.PricePerNight,
                        Capacity = r.Capacity,
                        AvailableRooms = r.AvailableRooms
                    })
                    .ToList()
            })
            .Where(h => h.Rooms.Count > 0)
            .ToList();
        }

        public async Task<List<BookingResponseDto>> GetAllAsync()
        {
            var bookings = await _bookingRepository.GetAllAsync();
            return bookings.Select(MapToDto).ToList();
        }

        public async Task<List<BookingResponseDto>> GetMyBookingsAsync(int customerId)
        {
            var bookings = await _bookingRepository.GetByCustomerIdAsync(customerId);
            return bookings.Select(MapToDto).ToList();
        }

        public async Task<List<BookingResponseDto>> GetHotelBookingsAsync(int managerId)
        {
            var hotel = await _hotelRepository.GetByManagerIdAsync(managerId)
                ?? throw new KeyNotFoundException("No hotel found for this manager.");

            var bookings = await _bookingRepository.GetByHotelIdAsync(hotel.HotelId);
            return bookings.Select(MapToDto).ToList();
        }

        public async Task<BookingResponseDto> GetByIdAsync(int bookingId)
        {
            var booking = await _bookingRepository.GetByIdAsync(bookingId)
                ?? throw new KeyNotFoundException("Booking not found.");
            return MapToDto(booking);
        }

        public async Task<BookingResponseDto> CreateAsync(int customerId, CreateBookingDto dto)
        {
            if (dto.CheckInDate.Date < DateTime.UtcNow.Date)
                throw new ArgumentException("Check-in date cannot be in the past.");

            if (dto.CheckOutDate.Date <= dto.CheckInDate.Date)
                throw new ArgumentException("Check-out date must be after check-in date.");

            var room = await _roomRepository.GetByIdAsync(dto.RoomId)
                ?? throw new KeyNotFoundException("Room not found.");

            if (room.Status != "Active")
                throw new ArgumentException("Room is not available.");

            if (room.AvailableRooms <= 0)
                throw new ArgumentException("No available rooms of this type.");

            int nights = (dto.CheckOutDate.Date - dto.CheckInDate.Date).Days;
            decimal totalAmount = room.PricePerNight * nights;

            room.AvailableRooms -= 1;
            await _roomRepository.UpdateAsync(room);

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

            var created = await _bookingRepository.CreateAsync(booking);
            return await GetByIdAsync(created.BookingId);
        }

        public async Task<BookingResponseDto> CancelAsync(int customerId, int bookingId)
        {
            var booking = await _bookingRepository.GetByIdAsync(bookingId)
                ?? throw new KeyNotFoundException("Booking not found.");

            if (booking.CustomerId != customerId)
                throw new UnauthorizedAccessException("You can only cancel your own bookings.");

            if (booking.Status == "Cancelled")
                throw new ArgumentException("Booking is already cancelled.");

            if (booking.Status == "Completed")
                throw new ArgumentException("Completed bookings cannot be cancelled.");

            booking.Status = "Cancelled";
            await _bookingRepository.UpdateAsync(booking);

            var room = await _roomRepository.GetByIdAsync(booking.RoomId);
            if (room != null)
            {
                room.AvailableRooms += 1;
                await _roomRepository.UpdateAsync(room);
            }

            return MapToDto(booking);
        }

        private static BookingResponseDto MapToDto(Booking booking)
        {
            return new BookingResponseDto
            {
                BookingId = booking.BookingId,
                RoomId = booking.RoomId,
                HotelId = booking.HotelId,
                HotelName = booking.Hotel?.HotelName ?? string.Empty,
                RoomType = booking.Room?.RoomType ?? string.Empty,
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