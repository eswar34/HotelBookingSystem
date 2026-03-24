namespace HotelBookingSystem.API.DTOs.Booking
{
    public class HotelBookingListDto
    {
        public int HotelId { get; set; }
        public string HotelName { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public int StarRating { get; set; }
        public List<RoomBookingListDto> Rooms { get; set; } = new();
    }

    public class RoomBookingListDto
    {
        public int RoomId { get; set; }
        public string RoomType { get; set; } = string.Empty;
        public decimal PricePerNight { get; set; }
        public int Capacity { get; set; }
        public int AvailableRooms { get; set; }
    }

    public class CreateBookingDto
    {
        public int RoomId { get; set; }
        public int HotelId { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
    }

    public class BookingResponseDto
    {
        public int BookingId { get; set; }
        public int RoomId { get; set; }
        public int HotelId { get; set; }
        public string HotelName { get; set; } = string.Empty;
        public string RoomType { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}