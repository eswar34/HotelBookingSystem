SET NOCOUNT ON;

DECLARE @ManagerId INT;
DECLARE @CustomerId INT;
DECLARE @Hotel1Id INT;
DECLARE @Hotel2Id INT;
DECLARE @AmenityWifiId INT;
DECLARE @AmenityPoolId INT;
DECLARE @AmenityGymId INT;
DECLARE @AmenityRestaurantId INT;
DECLARE @AmenityParkingId INT;

IF NOT EXISTS (SELECT 1 FROM [Users] WHERE Email = 'manager@test.com')
BEGIN
    INSERT INTO [Users] (FullName, Email, PasswordHash, Role, CreatedAt)
    VALUES ('Test Manager', 'manager@test.com', 'test-hash', 'Manager', GETUTCDATE());
END;

IF NOT EXISTS (SELECT 1 FROM [Users] WHERE Email = 'customer@test.com')
BEGIN
    INSERT INTO [Users] (FullName, Email, PasswordHash, Role, CreatedAt)
    VALUES ('Test Customer', 'customer@test.com', 'test-hash', 'Customer', GETUTCDATE());
END;

SELECT @ManagerId = UserId FROM [Users] WHERE Email = 'manager@test.com';
SELECT @CustomerId = UserId FROM [Users] WHERE Email = 'customer@test.com';

IF NOT EXISTS (SELECT 1 FROM [Amenities] WHERE Name = 'WiFi')
    INSERT INTO [Amenities] (Name) VALUES ('WiFi');
IF NOT EXISTS (SELECT 1 FROM [Amenities] WHERE Name = 'Swimming Pool')
    INSERT INTO [Amenities] (Name) VALUES ('Swimming Pool');
IF NOT EXISTS (SELECT 1 FROM [Amenities] WHERE Name = 'Gym')
    INSERT INTO [Amenities] (Name) VALUES ('Gym');
IF NOT EXISTS (SELECT 1 FROM [Amenities] WHERE Name = 'Restaurant')
    INSERT INTO [Amenities] (Name) VALUES ('Restaurant');
IF NOT EXISTS (SELECT 1 FROM [Amenities] WHERE Name = 'Parking')
    INSERT INTO [Amenities] (Name) VALUES ('Parking');

SELECT @AmenityWifiId = AmenityId FROM [Amenities] WHERE Name = 'WiFi';
SELECT @AmenityPoolId = AmenityId FROM [Amenities] WHERE Name = 'Swimming Pool';
SELECT @AmenityGymId = AmenityId FROM [Amenities] WHERE Name = 'Gym';
SELECT @AmenityRestaurantId = AmenityId FROM [Amenities] WHERE Name = 'Restaurant';
SELECT @AmenityParkingId = AmenityId FROM [Amenities] WHERE Name = 'Parking';

IF NOT EXISTS (SELECT 1 FROM [Hotels] WHERE HotelName = 'Grand Plaza Hotel' AND City = 'New York')
BEGIN
    INSERT INTO [Hotels] (ManagerId, HotelName, City, Location, Description, StarRating, Status, CreatedAt)
    VALUES (@ManagerId, 'Grand Plaza Hotel', 'New York', '123 Broadway, Manhattan', 'Luxury 5-star hotel in NYC', 5, 'Approved', GETUTCDATE());
END;

IF NOT EXISTS (SELECT 1 FROM [Hotels] WHERE HotelName = 'Sunset Beach Resort' AND City = 'Miami')
BEGIN
    INSERT INTO [Hotels] (ManagerId, HotelName, City, Location, Description, StarRating, Status, CreatedAt)
    VALUES (@ManagerId, 'Sunset Beach Resort', 'Miami', '456 Ocean Drive', 'Beachfront resort with ocean view', 4, 'Approved', GETUTCDATE());
END;

SELECT @Hotel1Id = HotelId FROM [Hotels] WHERE HotelName = 'Grand Plaza Hotel' AND City = 'New York';
SELECT @Hotel2Id = HotelId FROM [Hotels] WHERE HotelName = 'Sunset Beach Resort' AND City = 'Miami';

IF NOT EXISTS (SELECT 1 FROM [HotelAmenities] WHERE HotelId = @Hotel1Id AND AmenityId = @AmenityWifiId)
    INSERT INTO [HotelAmenities] (HotelId, AmenityId) VALUES (@Hotel1Id, @AmenityWifiId);
IF NOT EXISTS (SELECT 1 FROM [HotelAmenities] WHERE HotelId = @Hotel1Id AND AmenityId = @AmenityPoolId)
    INSERT INTO [HotelAmenities] (HotelId, AmenityId) VALUES (@Hotel1Id, @AmenityPoolId);
IF NOT EXISTS (SELECT 1 FROM [HotelAmenities] WHERE HotelId = @Hotel1Id AND AmenityId = @AmenityGymId)
    INSERT INTO [HotelAmenities] (HotelId, AmenityId) VALUES (@Hotel1Id, @AmenityGymId);
IF NOT EXISTS (SELECT 1 FROM [HotelAmenities] WHERE HotelId = @Hotel1Id AND AmenityId = @AmenityRestaurantId)
    INSERT INTO [HotelAmenities] (HotelId, AmenityId) VALUES (@Hotel1Id, @AmenityRestaurantId);
IF NOT EXISTS (SELECT 1 FROM [HotelAmenities] WHERE HotelId = @Hotel1Id AND AmenityId = @AmenityParkingId)
    INSERT INTO [HotelAmenities] (HotelId, AmenityId) VALUES (@Hotel1Id, @AmenityParkingId);

IF NOT EXISTS (SELECT 1 FROM [HotelAmenities] WHERE HotelId = @Hotel2Id AND AmenityId = @AmenityWifiId)
    INSERT INTO [HotelAmenities] (HotelId, AmenityId) VALUES (@Hotel2Id, @AmenityWifiId);
IF NOT EXISTS (SELECT 1 FROM [HotelAmenities] WHERE HotelId = @Hotel2Id AND AmenityId = @AmenityPoolId)
    INSERT INTO [HotelAmenities] (HotelId, AmenityId) VALUES (@Hotel2Id, @AmenityPoolId);
IF NOT EXISTS (SELECT 1 FROM [HotelAmenities] WHERE HotelId = @Hotel2Id AND AmenityId = @AmenityParkingId)
    INSERT INTO [HotelAmenities] (HotelId, AmenityId) VALUES (@Hotel2Id, @AmenityParkingId);

IF NOT EXISTS (SELECT 1 FROM [Rooms] WHERE HotelId = @Hotel1Id AND RoomType = 'Deluxe')
BEGIN
    INSERT INTO [Rooms] (HotelId, RoomType, PricePerNight, Capacity, AvailableRooms, Description, Status)
    VALUES (@Hotel1Id, 'Deluxe', 150.00, 2, 5, 'Spacious room with city view', 'Active');
END;

IF NOT EXISTS (SELECT 1 FROM [Rooms] WHERE HotelId = @Hotel1Id AND RoomType = 'Suite')
BEGIN
    INSERT INTO [Rooms] (HotelId, RoomType, PricePerNight, Capacity, AvailableRooms, Description, Status)
    VALUES (@Hotel1Id, 'Suite', 250.00, 4, 3, 'Luxury suite with living area', 'Active');
END;

IF NOT EXISTS (SELECT 1 FROM [Rooms] WHERE HotelId = @Hotel1Id AND RoomType = 'Standard')
BEGIN
    INSERT INTO [Rooms] (HotelId, RoomType, PricePerNight, Capacity, AvailableRooms, Description, Status)
    VALUES (@Hotel1Id, 'Standard', 100.00, 2, 10, 'Standard room with amenities', 'Active');
END;

IF NOT EXISTS (SELECT 1 FROM [Rooms] WHERE HotelId = @Hotel2Id AND RoomType = 'Beachfront')
BEGIN
    INSERT INTO [Rooms] (HotelId, RoomType, PricePerNight, Capacity, AvailableRooms, Description, Status)
    VALUES (@Hotel2Id, 'Beachfront', 200.00, 2, 8, 'Room with private beach access', 'Active');
END;

IF NOT EXISTS (SELECT 1 FROM [Rooms] WHERE HotelId = @Hotel2Id AND RoomType = 'Standard')
BEGIN
    INSERT INTO [Rooms] (HotelId, RoomType, PricePerNight, Capacity, AvailableRooms, Description, Status)
    VALUES (@Hotel2Id, 'Standard', 80.00, 2, 15, 'Standard room near beach', 'Active');
END;

SELECT 'Seed complete' AS Result,
       (SELECT COUNT(*) FROM [Users]) AS UsersCount,
       (SELECT COUNT(*) FROM [Hotels]) AS HotelsCount,
       (SELECT COUNT(*) FROM [Amenities]) AS AmenitiesCount,
       (SELECT COUNT(*) FROM [Rooms]) AS RoomsCount,
       (SELECT COUNT(*) FROM [HotelAmenities]) AS HotelAmenitiesCount;
