namespace HotelBookingSystem.API.DTOs.Room
{
    public class CreateRoomDto
    {
        public string RoomType { get; set; } = string.Empty;
        public decimal PricePerNight { get; set; }
        public int Capacity { get; set; }
        public int AvailableRooms { get; set; }
        public string Description { get; set; } = string.Empty;
    }

    public class UpdateRoomDto
    {
        public string RoomType { get; set; } = string.Empty;
        public decimal PricePerNight { get; set; }
        public int Capacity { get; set; }
        public int AvailableRooms { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }

    public class RoomResponseDto
    {
        public int RoomId { get; set; }
        public int HotelId { get; set; }
        public string RoomType { get; set; } = string.Empty;
        public decimal PricePerNight { get; set; }
        public int Capacity { get; set; }
        public int AvailableRooms { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
}