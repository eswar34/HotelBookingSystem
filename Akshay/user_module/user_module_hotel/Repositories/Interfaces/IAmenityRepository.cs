using user_module_hotel.Models;

namespace user_module_hotel.Repositories.Interfaces
{
    public interface IAmenityRepository
    {
        Task<List<Amenity>> GetAllAsync();
    }
}
