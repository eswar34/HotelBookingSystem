using HotelBookingSystem.API.Enums;
using HotelBookingSystem.API.Models;

namespace HotelBookingSystem.API.Data
{
    public static class SeedData
    {
        public static void Initialize(AppDbContext context)
        {
            const string adminEmail = "admin@hotel.com";

            var adminExists = context.Users.Any(u => u.Email == adminEmail);
            if (adminExists)
                return;

            var admin = new User
            {
                FullName = "Admin User",
                Email = adminEmail,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
                Role = UserRole.Admin,
                CreatedAt = DateTime.UtcNow
            };

            context.Users.Add(admin);
            context.SaveChanges();
        }
    }
}