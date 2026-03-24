-- SQL Insert Scripts for HotelsusersBookingDB
-- Run these in SQL Server Management Studio or SQL Server Management Tools

-- 1. INSERT TEST CUSTOMER (We'll create this via API, so this is optional)
INSERT INTO [Users] (FullName, Email, PasswordHash, Role, CreatedAt)
VALUES ('John Doe', 'john@test.com', '$2a$11$8j9Z.dBvKzI9kLv3Zx5c/u7y6Z1k2m3n4o5p6q7r8s9t0u1v2w3x', 'Customer', GETUTCDATE());

-- 2. INSERT APPROVED HOTEL
INSERT INTO [Hotels] (ManagerId, HotelName, City, Location, Description, StarRating, Status, CreatedAt)
VALUES (1, 'Grand Plaza Hotel', 'New York', '123 Broadway, Manhattan', 'Luxury 5-star hotel in the heart of NYC', 5, 'Approved', GETUTCDATE());

-- 3. INSERT AMENITIES
INSERT INTO [Amenities] (Name) VALUES ('WiFi');
INSERT INTO [Amenities] (Name) VALUES ('Swimming Pool');
INSERT INTO [Amenities] (Name) VALUES ('Gym');
INSERT INTO [Amenities] (Name) VALUES ('Restaurant');
INSERT INTO [Amenities] (Name) VALUES ('Parking');

-- 4. LINK HOTEL WITH AMENITIES
-- Get the HotelId from the inserted hotel (assume it's 1)
-- Get AmenityIds (should be 1-5)
INSERT INTO [HotelAmenities] (HotelId, AmenityId) VALUES (1, 1); -- WiFi
INSERT INTO [HotelAmenities] (HotelId, AmenityId) VALUES (1, 2); -- Swimming Pool
INSERT INTO [HotelAmenities] (HotelId, AmenityId) VALUES (1, 3); -- Gym
INSERT INTO [HotelAmenities] (HotelId, AmenityId) VALUES (1, 4); -- Restaurant
INSERT INTO [HotelAmenities] (HotelId, AmenityId) VALUES (1, 5); -- Parking

-- 5. INSERT ROOMS FOR THE HOTEL
INSERT INTO [Rooms] (HotelId, RoomType, PricePerNight, Capacity, AvailableRooms, Description, Status)
VALUES (1, 'Deluxe', 150.00, 2, 5, 'Spacious room with city view', 'Active');

INSERT INTO [Rooms] (HotelId, RoomType, PricePerNight, Capacity, AvailableRooms, Description, Status)
VALUES (1, 'Suite', 250.00, 4, 3, 'Luxury suite with living area', 'Active');

INSERT INTO [Rooms] (HotelId, RoomType, PricePerNight, Capacity, AvailableRooms, Description, Status)
VALUES (1, 'Standard', 100.00, 2, 10, 'Standard room with amenities', 'Active');

-- OPTIONAL: INSERT ANOTHER HOTEL FOR SEARCH TESTING
INSERT INTO [Hotels] (ManagerId, HotelName, City, Location, Description, StarRating, Status, CreatedAt)
VALUES (1, 'Sunset Beach Resort', 'Miami', '456 Ocean Drive', 'Beachfront resort with water activities', 4, 'Approved', GETUTCDATE());

-- Add rooms to second hotel
INSERT INTO [Rooms] (HotelId, RoomType, PricePerNight, Capacity, AvailableRooms, Description, Status)
VALUES (2, 'Beachfront', 200.00, 2, 8, 'Room with private beach access', 'Active');

INSERT INTO [Rooms] (HotelId, RoomType, PricePerNight, Capacity, AvailableRooms, Description, Status)
VALUES (2, 'Standard', 80.00, 2, 15, 'Standard room near beach', 'Active');

-- Link amenities to second hotel
INSERT INTO [HotelAmenities] (HotelId, AmenityId) VALUES (2, 1); -- WiFi
INSERT INTO [HotelAmenities] (HotelId, AmenityId) VALUES (2, 2); -- Swimming Pool
INSERT INTO [HotelAmenities] (HotelId, AmenityId) VALUES (2, 5); -- Parking
