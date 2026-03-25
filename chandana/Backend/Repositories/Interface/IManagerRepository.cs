namespace ManagerPart.Repositories.Interfaces;
public interface IManagerRepository
{
    List<Booking> GetPendingBookings();
    Booking GetBookingById(int id);
    void ApproveBooking(Booking booking);
    List<User> GetUsers();
}