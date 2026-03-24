using HotelBookingSystem.API.Models;
using Microsoft.EntityFrameworkCore;

namespace HotelBookingSystem.API.Data
{
    public static class SeedData
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            // Password: Admin@123
            modelBuilder.Entity<User>().HasData(new User
            {
                UserId = 1,
                FullName = "Platform Admin",
                Email = "admin@hotelbooking.com",
                PasswordHash = "$2a$11$M4FcXIUQfL6ICpTZrNdTI.IRZlKIGLPj/OcHMCJCHmp7C9aeREp.W",
                Role = "Admin",
                CreatedAt = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc)
            });

            modelBuilder.Entity<Amenity>().HasData(
                new Amenity { AmenityId = 1, Name = "WiFi" },
                new Amenity { AmenityId = 2, Name = "Pool" },
                new Amenity { AmenityId = 3, Name = "Gym" },
                new Amenity { AmenityId = 4, Name = "Parking" },
                new Amenity { AmenityId = 5, Name = "Restaurant" },
                new Amenity { AmenityId = 6, Name = "Spa" },
                new Amenity { AmenityId = 7, Name = "Air Conditioning" }
            );
        }
    }
}