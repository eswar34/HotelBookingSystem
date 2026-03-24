using HotelBookingSystem.API.Models;

namespace HotelBookingSystem.API.Repositories.Interfaces
{
    public interface IAmenityRepository
    {
        Task<List<Amenity>> GetAllAsync();
        Task<Amenity?> GetByIdAsync(int amenityId);
        Task<Amenity> CreateAsync(Amenity amenity);
    }
}