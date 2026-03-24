using HotelBookingSystem.API.Models;

namespace HotelBookingSystem.API.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllManagersAsync();
        Task<List<User>> GetAllCustomersAsync();
        Task<User?> GetByIdAsync(int userId);
    }
}