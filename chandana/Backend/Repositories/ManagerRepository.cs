namespace ManagerPart.Repositories;
public class ManagerRepository : IManagerRepository
{
    private readonly AppDbContext _context;

    public ManagerRepository(AppDbContext context)
    {
        _context = context;
    }

    public List<Booking> GetPendingBookings()
    {
        return _context.Bookings
            .Where(b => b.Status == "PENDING")
            .ToList();
    }

    public Booking GetBookingById(int id)
    {
        return _context.Bookings.FirstOrDefault(b => b.Id == id);
    }

    public void ApproveBooking(Booking booking)
    {
        booking.Status = "APPROVED";
        _context.SaveChanges();
    }

    public List<User> GetUsers()
    {
        return _context.Users.ToList();
    }
}