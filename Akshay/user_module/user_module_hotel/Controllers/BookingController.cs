using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using user_module_hotel.DTOs.Booking;
using user_module_hotel.Services.Interfaces;

namespace user_module_hotel.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [Authorize(Roles = "Customer")]
        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] CreateBookingDto dto)
        {
            var customerId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (customerId == 0)
                return Unauthorized();

            try
            {
                var booking = await _bookingService.CreateBookingAsync(customerId, dto);
                return CreatedAtAction(nameof(GetMyBookings), booking);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize(Roles = "Customer")]
        [HttpGet("my")]
        public async Task<IActionResult> GetMyBookings()
        {
            var customerId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (customerId == 0)
                return Unauthorized();

            var bookings = await _bookingService.GetMyBookingsAsync(customerId);
            return Ok(bookings);
        }

        [Authorize(Roles = "Customer")]
        [HttpPut("{bookingId}/cancel")]
        public async Task<IActionResult> CancelBooking(int bookingId)
        {
            var customerId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (customerId == 0)
                return Unauthorized();

            var result = await _bookingService.CancelBookingAsync(bookingId, customerId);
            if (!result)
                return NotFound();
            return Ok(new { message = "Booking cancelled successfully" });
        }
    }
}
