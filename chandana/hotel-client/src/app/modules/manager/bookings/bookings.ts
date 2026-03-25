import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Booking, BookingService } from '../../../core/services/booking.service';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-bookings',
  imports: [NgFor, NgIf, StatusBadgeComponent],
  templateUrl: './bookings.html',
  styleUrl: './bookings.scss'
})
export class BookingsComponent {
  bookings: Booking[] = [];
  managedHotelId = 1;

  constructor(private bookingService: BookingService, private authService: AuthService) {
    this.managedHotelId = this.authService.getManagedHotelId();
    this.bookings = this.bookingService
      .getBookings()
      .filter((booking) => booking.hotelId === this.managedHotelId);
  }
}
