using Microsoft.EntityFrameworkCore;
namespace ManagerPart.Data; // ✅ must match
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Booking> Bookings { get; set; }
    public DbSet<User> Users { get; set; }
}