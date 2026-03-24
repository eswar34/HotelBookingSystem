using Microsoft.AspNetCore.Mvc;
using user_module_hotel.Services.Interfaces;

namespace user_module_hotel.Controllers
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
        public async Task<IActionResult> GetApprovedHotels()
        {
            var hotels = await _hotelService.GetApprovedHotelsAsync();
            return Ok(hotels);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchHotels([FromQuery] string? city, [FromQuery] string? roomType, [FromQuery] decimal? minPrice, [FromQuery] decimal? maxPrice)
        {
            var hotels = await _hotelService.SearchHotelsAsync(city, roomType, minPrice, maxPrice);
            return Ok(hotels);
        }

        [HttpGet("{hotelId}")]
        public async Task<IActionResult> GetHotelById(int hotelId)
        {
            var hotel = await _hotelService.GetHotelByIdAsync(hotelId);
            if (hotel == null)
                return NotFound();
            return Ok(hotel);
        }
    }
}
