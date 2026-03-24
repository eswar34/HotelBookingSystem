using Microsoft.AspNetCore.Mvc;
using ManagerPart.Services;
using ManagerPart.Models;

[ApiController]
[Route("api/[controller]")]
public class ManagerController : ControllerBase
{
    private readonly IManagerService _service;

    public ManagerController(IManagerService service)
    {
        _service = service;
    }

    [HttpGet("pending")]
    public IActionResult GetPending()
    {
        return Ok(_service.GetPendingBookings());
    }

    [HttpGet("{id}")]
    public IActionResult GetBooking(int id)
    {
        var booking = _service.GetBooking(id);
        if (booking == null) return NotFound();

        return Ok(booking);
    }

    [HttpGet("profile/{id}")]
    public IActionResult GetManager(int id)
    {
        var manager = _service.GetManagerById(id);
        if (manager == null) return NotFound();
        return Ok(manager);
    }

    [HttpPut("approve/{id}")]
    public IActionResult Approve(int id)
    {
        _service.ApproveBooking(id);
        return Ok("Booking Approved");
    }

    [HttpGet("users")]
    public IActionResult GetUsers()
    {
        return Ok(_service.GetUsers());
    }

    // Get all bookings for a specific hotel (manager's hotel)
    [HttpGet("hotel/{hotelId}/bookings")]
    public IActionResult GetBookingsByHotel(int hotelId)
    {
        var bookings = _service.GetBookingsByHotelId(hotelId);
        return Ok(bookings);
    }

    // Add a room for a manager
    [HttpPost("{managerId}/rooms")]
    public IActionResult AddRoom(int managerId, [FromBody] Room room)
    {
        _service.AddRoom(managerId, room);
        return Ok("Room added successfully");
    }
}