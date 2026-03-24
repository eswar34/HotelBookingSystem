import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../core/services/booking.service';
import { Booking } from '../../../models/booking.model';

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.html',
  styleUrl: './bookings.scss'
})
export class AdminBookingsComponent implements OnInit {
  private readonly bookingService = inject(BookingService);

  bookings: Booking[] = [];
  loading = true;
  error = '';

  ngOnInit(): void {
    this.bookingService.getAllBookings().subscribe({
      next: (data) => {
        this.bookings = data;
      },
      error: (err) => {
        this.error = err?.error?.message ?? 'Failed to load bookings.';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
