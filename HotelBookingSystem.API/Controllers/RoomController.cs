using HotelBookingSystem.API.DTOs.Room;
using HotelBookingSystem.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HotelBookingSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomController : ControllerBase
    {
        private readonly IRoomService _roomService;

        public RoomController(IRoomService roomService)
        {
            _roomService = roomService;
        }

        [HttpGet("hotel/{hotelId}")]
        public async Task<IActionResult> GetByHotel(int hotelId)
        {
            var result = await _roomService.GetByHotelIdAsync(hotelId);
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> Create(CreateRoomDto dto)
        {
            int managerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var result = await _roomService.CreateAsync(managerId, dto);
            return Ok(result);
        }

        [HttpPut("{roomId}")]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> Update(int roomId, UpdateRoomDto dto)
        {
            int managerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var result = await _roomService.UpdateAsync(managerId, roomId, dto);
            return Ok(result);
        }
    }
}