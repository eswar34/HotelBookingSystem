import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingService } from '../../../core/services/booking.service';
import { Booking, CreateBookingDto } from '../../../models/booking.model';

@Component({
  selector: 'app-customer-my-bookings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.scss'
})
export class CustomerMyBookingsComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly bookingService = inject(BookingService);

  bookings: Booking[] = [];

  loadingBookings = true;
  submitting = false;
  cancellingBookingId: number | null = null;

  error = '';
  bookingError = '';
  bookingSuccess = '';

  readonly form = this.fb.nonNullable.group({
    hotelId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    roomId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    checkInDate: ['', [Validators.required]],
    checkOutDate: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.loadBookings();
  }

  submitBooking(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.bookingError = '';
    this.bookingSuccess = '';

    const payload: CreateBookingDto = {
      hotelId: Number(this.form.controls.hotelId.value),
      roomId: Number(this.form.controls.roomId.value),
      checkInDate: `${this.form.controls.checkInDate.value}T00:00:00`,
      checkOutDate: `${this.form.controls.checkOutDate.value}T00:00:00`
    };

    this.bookingService.createBooking(payload).subscribe({
      next: () => {
        this.bookingSuccess = 'Booking successful. Saved to database.';
        this.loadBookings();
      },
      error: (err) => {
        const serverMessage = err?.error?.message ?? err?.error?.title ?? err?.message;
        this.bookingError = `Failed to create booking${err?.status ? ` (${err.status})` : ''}: ${serverMessage ?? 'Unknown error'}`;
      },
      complete: () => {
        this.submitting = false;
      }
    });
  }

  cancelBooking(bookingId: number): void {
    const confirmed = window.confirm('Are you sure you want to cancel this booking?');
    if (!confirmed) {
      return;
    }

    this.bookingError = '';
    this.bookingSuccess = '';
    this.cancellingBookingId = bookingId;

    this.bookingService.cancelBooking(bookingId).subscribe({
      next: () => {
        this.bookingSuccess = 'Booking cancelled successfully.';
        this.loadBookings();
      },
      error: (err) => {
        const serverMessage = err?.error?.message ?? err?.error?.title ?? err?.message;
        this.bookingError = `Failed to cancel booking${err?.status ? ` (${err.status})` : ''}: ${serverMessage ?? 'Unknown error'}`;
      },
      complete: () => {
        this.cancellingBookingId = null;
      }
    });
  }

  private loadBookings(): void {
    this.loadingBookings = true;
    this.bookingService.getMyBookings().subscribe({
      next: (data) => {
        this.bookings = data;
      },
      error: (err) => {
        const serverMessage = err?.error?.message ?? err?.error?.title ?? err?.message;
        this.error = `Failed to load your bookings${err?.status ? ` (${err.status})` : ''}: ${serverMessage ?? 'Unknown error'}`;
      },
      complete: () => {
        this.loadingBookings = false;
      }
    });
  }
}
