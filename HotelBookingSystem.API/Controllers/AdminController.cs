using HotelBookingSystem.API.DTOs.Manager;
using HotelBookingSystem.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HotelBookingSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IHotelService _hotelService;
        private readonly IBookingService _bookingService;

        public AdminController(IUserService userService, IHotelService hotelService, IBookingService bookingService)
        {
            _userService = userService;
            _hotelService = hotelService;
            _bookingService = bookingService;
        }

        [HttpGet("managers")]
        public async Task<IActionResult> GetAllManagers()
        {
            var result = await _userService.GetAllManagersAsync();
            return Ok(result);
        }

        [HttpPost("managers")]
        public async Task<IActionResult> CreateManager(CreateManagerDto dto)
        {
            var result = await _userService.CreateManagerAsync(dto);
            return Ok(result);
        }

        [HttpGet("hotels")]
        public async Task<IActionResult> GetAllHotels()
        {
            var result = await _hotelService.GetAllAsync();
            return Ok(result);
        }

        [HttpPut("hotels/{hotelId}/approve")]
        public async Task<IActionResult> ApproveHotel(int hotelId)
        {
            var result = await _hotelService.ApproveAsync(hotelId);
            return Ok(result);
        }

        [HttpGet("bookings")]
        public async Task<IActionResult> GetAllBookings()
        {
            var result = await _bookingService.GetAllAsync();
            return Ok(result);
        }
    }
}