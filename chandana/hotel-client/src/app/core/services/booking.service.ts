import { Injectable } from '@angular/core';

export interface Booking {
  id: number;
  hotelId: number;
  roomId: number;
  guestName: string;
  userEmail: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private bookings: Booking[] = [
    {
      id: 1,
      hotelId: 2,
      roomId: 201,
      guestName: 'Demo User',
      userEmail: 'demo.user@mail.com',
      checkIn: '2026-03-28',
      checkOut: '2026-03-30',
      status: 'confirmed'
    }
  ];

  getBookings(): Booking[] {
    return [...this.bookings];
  }

  createBooking(payload: Omit<Booking, 'id' | 'status'>): Booking {
    const booking: Booking = {
      id: Date.now(),
      status: 'confirmed',
      ...payload
    };

    this.bookings = [booking, ...this.bookings];
    return booking;
  }
}
