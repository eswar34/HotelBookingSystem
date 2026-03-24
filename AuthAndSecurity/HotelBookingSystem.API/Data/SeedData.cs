using HotelBookingSystem.API.Enums;
using HotelBookingSystem.API.Models;
using Microsoft.EntityFrameworkCore;

namespace HotelBookingSystem.API.Data
{
    public static class SeedData
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Amenity>().HasData(
                new Amenity { AmenityId = 1, Name = "WiFi" },
                new Amenity { AmenityId = 2, Name = "Parking" },
                new Amenity { AmenityId = 3, Name = "Pool" }
            );
        }

        public static void Initialize(AppDbContext context)
        {
            const string adminEmail = "admin@hotel.com";
            const string managerEmail = "manager@hotel.com";
            const string customerEmail = "customer@hotel.com";

            var hasChanges = false;

            var admin = context.Users.FirstOrDefault(u => u.Email == adminEmail);
            if (admin is null)
            {
                admin = new User
                {
                    FullName = "Admin User",
                    Email = adminEmail,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
                    Role = UserRole.Admin,
                    CreatedAt = DateTime.UtcNow
                };
                context.Users.Add(admin);
                hasChanges = true;
            }

            var manager = context.Users.FirstOrDefault(u => u.Email == managerEmail);
            if (manager is null)
            {
                manager = new User
                {
                    FullName = "Manager User",
                    Email = managerEmail,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Manager@123"),
                    Role = UserRole.Manager,
                    CreatedAt = DateTime.UtcNow
                };
                context.Users.Add(manager);
                hasChanges = true;
            }

            var customer = context.Users.FirstOrDefault(u => u.Email == customerEmail);
            if (customer is null)
            {
                customer = new User
                {
                    FullName = "Customer User",
                    Email = customerEmail,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Customer@123"),
                    Role = UserRole.Customer,
                    CreatedAt = DateTime.UtcNow
                };
                context.Users.Add(customer);
                hasChanges = true;
            }

            if (hasChanges)
            {
                context.SaveChanges();
            }

            var hotel = context.Hotels.FirstOrDefault(h => h.HotelName == "Grand Hotel");
            if (hotel is null && manager is not null)
            {
                hotel = new Hotel
                {
                    ManagerId = manager.UserId,
                    HotelName = "Grand Hotel",
                    City = "Chennai",
                    Location = "OMR",
                    Description = "Business hotel",
                    StarRating = 4,
                    Status = "Active",
                    CreatedAt = DateTime.UtcNow
                };
                context.Hotels.Add(hotel);
                context.SaveChanges();
            }

            var room = context.Rooms.FirstOrDefault(r => r.HotelId == hotel!.HotelId && r.RoomType == "Deluxe");
            if (room is null)
            {
                room = new Room
                {
                    HotelId = hotel.HotelId,
                    RoomType = "Deluxe",
                    PricePerNight = 3500,
                    Capacity = 2,
                    AvailableRooms = 5,
                    Description = "Deluxe room with city view",
                    Status = "Active"
                };
                context.Rooms.Add(room);
                context.SaveChanges();
            }

            var baseDate = DateTime.UtcNow.Date;
            var sampleBookings = new[]
            {
                new { CheckIn = baseDate.AddDays(1), CheckOut = baseDate.AddDays(3), Status = "Confirmed" },
                new { CheckIn = baseDate.AddDays(4), CheckOut = baseDate.AddDays(6), Status = "Confirmed" },
                new { CheckIn = baseDate.AddDays(7), CheckOut = baseDate.AddDays(9), Status = "Cancelled" }
            };

            foreach (var sample in sampleBookings)
            {
                var exists = context.Bookings.Any(b =>
                    b.CustomerId == customer!.UserId &&
                    b.RoomId == room!.RoomId &&
                    b.CheckInDate.Date == sample.CheckIn &&
                    b.CheckOutDate.Date == sample.CheckOut);

                if (exists)
                    continue;

                var nights = (sample.CheckOut - sample.CheckIn).Days;
                context.Bookings.Add(new Booking
                {
                    CustomerId = customer.UserId,
                    HotelId = hotel.HotelId,
                    RoomId = room.RoomId,
                    CheckInDate = sample.CheckIn,
                    CheckOutDate = sample.CheckOut,
                    TotalAmount = room.PricePerNight * nights,
                    Status = sample.Status,
                    CreatedAt = DateTime.UtcNow
                });

                if (sample.Status != "Cancelled")
                {
                    room.AvailableRooms = Math.Max(0, room.AvailableRooms - 1);
                }
            }

            context.SaveChanges();
        }
    }
}