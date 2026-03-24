using HotelBookingSystem.API.DTOs.Booking;
using HotelBookingSystem.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HotelBookingSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _bookingService.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("my")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> GetMyBookings()
        {
            int customerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var result = await _bookingService.GetMyBookingsAsync(customerId);
            return Ok(result);
        }

        [HttpGet("hotels")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> GetHotelsForBooking()
        {
            var result = await _bookingService.GetHotelsForBookingAsync();
            return Ok(result);
        }

        [HttpGet("hotel")]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> GetHotelBookings()
        {
            int managerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var result = await _bookingService.GetHotelBookingsAsync(managerId);
            return Ok(result);
        }

        [HttpGet("{bookingId}")]
        public async Task<IActionResult> GetById(int bookingId)
        {
            var result = await _bookingService.GetByIdAsync(bookingId);
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> Create([FromBody] CreateBookingDto dto)
        {
            int customerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var result = await _bookingService.CreateAsync(customerId, dto);
            return Ok(result);
        }

        [HttpPut("{bookingId}/cancel")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> Cancel(int bookingId)
        {
            int customerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var result = await _bookingService.CancelAsync(customerId, bookingId);
            return Ok(result);
        }
    }
}