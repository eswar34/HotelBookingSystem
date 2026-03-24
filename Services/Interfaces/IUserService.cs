using HotelBookingSystem.API.DTOs.Manager;
using HotelBookingSystem.API.DTOs.User;

namespace HotelBookingSystem.API.Services.Interfaces
{
    public interface IUserService
    {
        Task<List<ManagerResponseDto>> GetAllManagersAsync();
        Task<List<UserSummaryDto>> GetAllCustomersAsync();
        Task<ManagerResponseDto> CreateManagerAsync(CreateManagerDto dto);
    }
}