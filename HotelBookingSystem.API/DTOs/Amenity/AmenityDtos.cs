namespace HotelBookingSystem.API.DTOs.Amenity
{
    public class CreateAmenityDto
    {
        public string Name { get; set; } = string.Empty;
    }

    public class AmenityResponseDto
    {
        public int AmenityId { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}