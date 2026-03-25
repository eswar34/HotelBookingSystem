public class ManagerService : IManagerService
{
    private readonly IManagerRepository _repository;

    public ManagerService(IManagerRepository repository)
    {
        _repository = repository;
    }

    public List<Booking> GetPendingBookings()
    {
        return _repository.GetPendingBookings();
    }

    public Booking GetBooking(int id)
    {
        return _repository.GetBookingById(id);
    }

    public void ApproveBooking(int id)
    {
        var booking = _repository.GetBookingById(id);
        if (booking != null)
        {
            _repository.ApproveBooking(booking);
        }
    }

    public List<User> GetUsers()
    {
        return _repository.GetUsers();
    }
}