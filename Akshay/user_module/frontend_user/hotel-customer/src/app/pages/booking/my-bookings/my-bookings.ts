import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { BookingService } from '../../../core/services/booking.service';
import { Booking } from '../../../models/booking.model';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.scss'
})
export class MyBookingsPage implements OnInit {
  private readonly bookingService = inject(BookingService);

  loading = false;
  errorMessage = '';
  bookings: Booking[] = [];

  ngOnInit(): void {
    this.loadBookings();
  }

  cancelBooking(booking: Booking): void {
    if (booking.status.toLowerCase() !== 'confirmed') {
      return;
    }

    const confirmed = confirm('Do you want to cancel this booking?');
    if (!confirmed) {
      return;
    }

    this.bookingService.cancelBooking(booking.bookingId).subscribe({
      next: () => {
        this.bookings = this.bookings.map((item) =>
          item.bookingId === booking.bookingId ? { ...item, status: 'Cancelled' } : item
        );
      },
      error: () => {
        this.errorMessage = 'Unable to cancel booking right now.';
      }
    });
  }

  getBadgeClass(status: string): string {
    const normalized = status.toLowerCase();
    if (normalized === 'confirmed') return 'confirmed';
    if (normalized === 'cancelled') return 'cancelled';
    return 'completed';
  }

  private loadBookings(): void {
    this.loading = true;
    this.errorMessage = '';

    this.bookingService.getMyBookings().subscribe({
      next: (bookings) => {
        this.bookings = bookings;
      },
      error: () => {
        this.errorMessage = 'Unable to load your bookings.';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
