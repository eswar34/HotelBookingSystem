using HotelBookingSystem.API.DTOs.Manager;
using HotelBookingSystem.API.Models;
using HotelBookingSystem.API.Repositories.Interfaces;
using HotelBookingSystem.API.Services.Interfaces;

namespace HotelBookingSystem.API.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IAuthRepository _authRepository;
        private readonly IHotelRepository _hotelRepository;

        public UserService(IUserRepository userRepository, IAuthRepository authRepository, IHotelRepository hotelRepository)
        {
            _userRepository = userRepository;
            _authRepository = authRepository;
            _hotelRepository = hotelRepository;
        }

        public async Task<List<ManagerResponseDto>> GetAllManagersAsync()
        {
            var managers = await _userRepository.GetAllManagersAsync();

            return managers.Select(m => new ManagerResponseDto
            {
                UserId = m.UserId,
                FullName = m.FullName,
                Email = m.Email,
                CreatedAt = m.CreatedAt,
                HotelName = m.ManagedHotel?.HotelName,
                City = m.ManagedHotel?.City,
                HotelStatus = m.ManagedHotel?.Status
            }).ToList();
        }

        public async Task<ManagerResponseDto> CreateManagerAsync(CreateManagerDto dto)
        {
            if (await _authRepository.EmailExistsAsync(dto.Email))
                throw new ArgumentException("Email is already registered.");

            var manager = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = "Manager"
            };

            await _authRepository.CreateUserAsync(manager);

            var hotel = new Hotel
            {
                ManagerId = manager.UserId,
                HotelName = dto.HotelName,
                City = dto.City,
                Location = dto.Location,
                Description = dto.Description,
                StarRating = dto.StarRating,
                Status = "Pending"
            };

            await _hotelRepository.CreateAsync(hotel);

            return new ManagerResponseDto
            {
                UserId = manager.UserId,
                FullName = manager.FullName,
                Email = manager.Email,
                CreatedAt = manager.CreatedAt,
                HotelName = hotel.HotelName,
                City = hotel.City,
                HotelStatus = hotel.Status
            };
        }
    }
}