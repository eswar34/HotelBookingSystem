using HotelBookingSystem.API.DTOs.Auth;
using HotelBookingSystem.API.Helpers;
using HotelBookingSystem.API.Models;
using HotelBookingSystem.API.Repositories.Interfaces;
using HotelBookingSystem.API.Services.Interfaces;

namespace HotelBookingSystem.API.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;
        private readonly JwtHelper _jwtHelper;

        public AuthService(IAuthRepository authRepository, JwtHelper jwtHelper)
        {
            _authRepository = authRepository;
            _jwtHelper = jwtHelper;
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
        {
            var user = await _authRepository.GetByEmailAsync(dto.Email)
                ?? throw new KeyNotFoundException("Invalid email or password.");

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                throw new UnauthorizedAccessException("Invalid email or password.");

            return new AuthResponseDto
            {
                Token = _jwtHelper.GenerateToken(user),
                User = new UserDto
                {
                    UserId = user.UserId,
                    FullName = user.FullName,
                    Email = user.Email,
                    Role = user.Role
                }
            };
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterDto dto)
        {
            if (await _authRepository.EmailExistsAsync(dto.Email))
                throw new ArgumentException("Email is already registered.");

            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = "Customer"
            };

            await _authRepository.CreateUserAsync(user);

            return new AuthResponseDto
            {
                Token = _jwtHelper.GenerateToken(user),
                User = new UserDto
                {
                    UserId = user.UserId,
                    FullName = user.FullName,
                    Email = user.Email,
                    Role = user.Role
                }
            };
        }
    }
}