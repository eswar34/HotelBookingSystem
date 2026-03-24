export interface Booking {
  bookingId: number;
  roomId: number;
  hotelId: number;
  hotelName: string;
  roomType: string;
  customerName: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export interface CreateBookingDto {
  roomId: number;
  hotelId: number;
  checkInDate: string;
  checkOutDate: string;
}
