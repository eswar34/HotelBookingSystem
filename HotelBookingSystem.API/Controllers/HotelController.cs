using HotelBookingSystem.API.DTOs.Hotel;
using HotelBookingSystem.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HotelBookingSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HotelController : ControllerBase
    {
        private readonly IHotelService _hotelService;

        public HotelController(IHotelService hotelService)
        {
            _hotelService = hotelService;
        }

        [HttpGet]
        public async Task<IActionResult> GetApproved()
        {
            var result = await _hotelService.GetApprovedAsync();
            return Ok(result);
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search(
            [FromQuery] string? city,
            [FromQuery] string? roomType,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice)
        {
            var result = await _hotelService.SearchAsync(city, roomType, minPrice, maxPrice);
            return Ok(result);
        }

        [HttpGet("{hotelId}")]
        public async Task<IActionResult> GetById(int hotelId)
        {
            var result = await _hotelService.GetByIdAsync(hotelId);
            return Ok(result);
        }

        [HttpGet("my-hotel")]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> GetMyHotel()
        {
            int managerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var result = await _hotelService.GetMyHotelAsync(managerId);
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> Create(CreateHotelDto dto)
        {
            int managerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var result = await _hotelService.CreateAsync(managerId, dto);
            return Ok(result);
        }

        [HttpPut("{hotelId}")]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> Update(int hotelId, UpdateHotelDto dto)
        {
            int managerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var result = await _hotelService.UpdateAsync(managerId, hotelId, dto);
            return Ok(result);
        }

        [HttpPost("amenities/{amenityId}")]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> AddAmenity(int amenityId)
        {
            int managerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var result = await _hotelService.AddAmenityAsync(managerId, amenityId);
            return Ok(new { success = result });
        }
    }
}