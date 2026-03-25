import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Booking, BookingService } from '../../../core/services/booking.service';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge';

@Component({
  selector: 'app-my-bookings',
  imports: [NgFor, StatusBadgeComponent],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.scss'
})
export class MyBookingsComponent {
  bookings: Booking[] = [];

  constructor(private bookingService: BookingService) {
    this.bookings = this.bookingService.getBookings();
  }
}
