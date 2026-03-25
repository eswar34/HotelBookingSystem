using HotelBookingSystem.API.DTOs.Manager;

namespace HotelBookingSystem.API.Services.Interfaces
{
    public interface IUserService
    {
        Task<List<ManagerResponseDto>> GetAllManagersAsync();
        Task<ManagerResponseDto> CreateManagerAsync(CreateManagerDto dto);
    }
}