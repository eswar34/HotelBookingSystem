namespace HotelBookingSystem.API.Models
{
    public class Amenity
    {
        public int AmenityId { get; set; }
        public string Name { get; set; } = string.Empty;

        public ICollection<HotelAmenity> HotelAmenities { get; set; } = new List<HotelAmenity>();
    }
}