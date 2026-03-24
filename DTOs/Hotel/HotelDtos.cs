namespace HotelBookingSystem.API.DTOs.Hotel
{
    public class CreateHotelDto
    {
        public string HotelName { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int StarRating { get; set; }
    }

    public class UpdateHotelDto
    {
        public string HotelName { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int StarRating { get; set; }
    }

    public class HotelResponseDto
    {
        public int HotelId { get; set; }
        public string HotelName { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int StarRating { get; set; }
        public string Status { get; set; } = string.Empty;
        public string ManagerName { get; set; } = string.Empty;
        public List<string> Amenities { get; set; } = new();
        public DateTime CreatedAt { get; set; }
    }
}