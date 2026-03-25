import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-booking',
  imports: [FormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.scss'
})
export class BookingComponent {
  guestName = '';
  checkIn = '';
  checkOut = '';
  message = '';

  hotelId = 0;
  roomId = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private authService: AuthService
  ) {
    this.hotelId = Number(this.route.snapshot.paramMap.get('hotelId'));
    this.roomId = Number(this.route.snapshot.paramMap.get('roomId'));
  }

  submitBooking(): void {
    if (!this.guestName || !this.checkIn || !this.checkOut) {
      this.message = 'Please fill all booking details.';
      return;
    }

    this.bookingService.createBooking({
      hotelId: this.hotelId,
      roomId: this.roomId,
      guestName: this.guestName,
      userEmail: this.authService.getUserEmail(),
      checkIn: this.checkIn,
      checkOut: this.checkOut
    });

    this.message = 'Booking confirmed successfully.';
    this.router.navigate(['/user/my-bookings']);
  }
}
