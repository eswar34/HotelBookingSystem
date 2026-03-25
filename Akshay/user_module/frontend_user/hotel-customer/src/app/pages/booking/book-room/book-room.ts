import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingService } from '../../../core/services/booking.service';
import { Booking } from '../../../models/booking.model';
import { Room } from '../../../models/room.model';

@Component({
  selector: 'app-book-room',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-room.html',
  styleUrl: './book-room.scss'
})
export class BookRoomPage {
  private readonly fb = inject(FormBuilder);
  private readonly bookingService = inject(BookingService);

  @Input({ required: true }) room!: Room;
  @Input({ required: true }) hotelId!: number;
  @Output() bookingSuccess = new EventEmitter<Booking>();
  @Output() closed = new EventEmitter<void>();

  loading = false;
  errorMessage = '';
  readonly minCheckInDate = this.toDateInputValue(new Date());

  readonly form = this.fb.nonNullable.group({
    checkInDate: ['', Validators.required],
    checkOutDate: ['', Validators.required]
  });

  get totalAmount(): number {
    const { checkInDate, checkOutDate } = this.form.getRawValue();
    if (!checkInDate || !checkOutDate) {
      return 0;
    }

    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffMs = end.getTime() - start.getTime();
    const nights = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (Number.isNaN(nights) || nights <= 0) {
      return 0;
    }

    return nights * this.room.pricePerNight;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.isValidCheckInDate()) {
      this.errorMessage = 'Check-in date must be today or a future date.';
      return;
    }

    if (this.totalAmount <= 0) {
      this.errorMessage = 'Check-out date must be after check-in date.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.bookingService
      .createBooking({
        roomId: this.room.roomId,
        hotelId: this.hotelId,
        checkInDate: this.form.controls.checkInDate.value,
        checkOutDate: this.form.controls.checkOutDate.value
      })
      .subscribe({
        next: (booking) => {
          this.bookingSuccess.emit(booking);
        },
        error: (err) => {
          this.errorMessage = err?.error?.message ?? 'Unable to complete booking.';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

  close(): void {
    this.closed.emit();
  }

  get minCheckOutDate(): string {
    return this.form.controls.checkInDate.value || this.minCheckInDate;
  }

  private isValidCheckInDate(): boolean {
    const checkIn = this.form.controls.checkInDate.value;
    if (!checkIn) {
      return false;
    }

    const today = this.toDateInputValue(new Date());
    return checkIn >= today;
  }

  private toDateInputValue(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
