# Hotel Customer Module API - user_module_hotel

## Overview
A standalone **ASP.NET Core 10** Web API for the Hotel Booking System's Customer Module. Connects to the existing `HotelssBookingDB` SQL Server database.

## Project Structure
```
user_module_hotel/
├── Controllers/
│   ├── HotelController.cs
│   ├── RoomController.cs
│   ├── BookingController.cs
│   └── AmenityController.cs
├── Services/
│   ├── Interfaces/
│   │   ├── IHotelService.cs
│   │   ├── IRoomService.cs
│   │   ├── IBookingService.cs
│   │   └── IAmenityService.cs
│   └── Implementations/
│       ├── HotelService.cs
│       ├── RoomService.cs
│       ├── BookingService.cs
│       └── AmenityService.cs
├── Repositories/
│   ├── Interfaces/
│   │   ├── IHotelRepository.cs
│   │   ├── IRoomRepository.cs
│   │   ├── IBookingRepository.cs
│   │   └── IAmenityRepository.cs
│   └── Implementations/
│       ├── HotelRepository.cs
│       ├── RoomRepository.cs
│       ├── BookingRepository.cs
│       └── AmenityRepository.cs
├── Models/
├── DTOs/
├── Data/ (AppDbContext.cs)
├── Helpers/ (JwtHelper.cs)
├── Middleware/ (ExceptionMiddleware.cs)
├── Program.cs
├── appsettings.json
└── appsettings.Development.json
```

## API Endpoints

### Hotel (Public)
- **GET** `/api/hotel` → All approved hotels with amenities
- **GET** `/api/hotel/search?city=&roomType=&minPrice=&maxPrice=` → Search hotels
- **GET** `/api/hotel/{hotelId}` → Hotel details with rooms & amenities

### Room (Public)
- **GET** `/api/room/hotel/{hotelId}` → Rooms of a specific hotel

### Booking (Customer - JWT Required)
- **POST** `/api/booking` → Create booking (auto-confirmed, decreases available rooms)
  - Body: `{ roomId, hotelId, checkInDate, checkOutDate }`
- **GET** `/api/booking/my` → Get customer's bookings (from JWT token)
- **PUT** `/api/booking/{bookingId}/cancel` → Cancel booking (increases available rooms)

### Amenity (Public)
- **GET** `/api/amenity` → All amenities

## Authentication
- **Type**: JWT Bearer Token
- **Claim Used**: `ClaimTypes.NameIdentifier` → Customer ID
- **Role Required**: `Customer` for booking endpoints
- **Token Expiry**: 8 hours

## Database
- **Server**: `localhost\SQLEXPRESS`
- **Database**: `HotelssBookingDB`
- **Connection**: SQL Authentication (sa user)

## Configuration (appsettings.json)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=HotelssBookingDB;User Id=sa;Password=Akshay@2005;TrustServerCertificate=True;MultipleActiveResultSets=True"
  },
  "JwtSettings": {
    "Key": "HotelBookingSystem@SecretKey@2025@JWT@Token",
    "Issuer": "HotelBookingSystem.API",
    "Audience": "HotelBookingSystem.Client",
    "ExpiryInHours": 8
  }
}
```

## Key Features
✅ Clean Architecture (Services → Repositories → Database)
✅ JWT Authentication & Authorization
✅ CORS enabled for Angular frontend (http://localhost:4200)
✅ Exception Middleware for error handling
✅ Async/await pattern throughout
✅ DTO mapping for response objects
✅ Automatic room availability management
✅ Decimal precision (18,2) for prices

## Running the Project
1. Ensure SQL Server Express is running
2. Database already exists with data (no migrations needed)
3. Build: `dotnet build`
4. Run: `dotnet run`
5. API will be available at: `https://localhost:5001` or `http://localhost:5000`

## Testing
Use **Postman** or **Insomnia** with:
- Public endpoints: No authentication required
- Booking endpoints: Include JWT token in `Authorization: Bearer {token}` header
