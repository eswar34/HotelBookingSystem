namespace ManagerPart.Services;

public interface IManagerService
{
    List<Booking> GetPendingBookings();
    Booking GetBooking(int id);
    void ApproveBooking(int id);
    List<User> GetUsers();
}