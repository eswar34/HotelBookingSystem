using HotelBookingSystem.API.Models;

namespace HotelBookingSystem.API.Repositories.Interfaces
{
    public interface IAuthRepository
    {
        Task<User?> GetByEmailAsync(string email);
        Task<User> CreateUserAsync(User user);
        Task<bool> EmailExistsAsync(string email);
    }
}