import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hotel, HotelService } from '../../../core/services/hotel.service';
import { BookingService } from '../../../core/services/booking.service';
import { AuthService } from '../../../core/services/auth.service';

interface AdminBookingView {
  userEmail: string;
  guestName: string;
  hotelName: string;
  roomId: number;
  status: string;
}

@Component({
  selector: 'app-admin-hotels',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './hotels.html',
  styleUrl: './hotels.scss'
})
export class AdminHotelsComponent {
  hotels: Hotel[] = [];
  bookingUsers: AdminBookingView[] = [];
  message = '';

  hotelName = '';
  hotelCity = '';
  hotelRating = 4.0;
  managerName = '';
  managerEmail = '';
  managerPassword = '';

  constructor(private hotelService: HotelService, private bookingService: BookingService, private authService: AuthService) {
    this.reloadData();
  }

  addHotelWithManager(): void {
    if (!this.hotelName || !this.managerName || !this.managerEmail || !this.managerPassword) {
      this.message = 'Please fill hotel name and manager details.';
      return;
    }

    const hotel = this.hotelService.addHotel(
      this.hotelName,
      this.hotelCity || 'Admin Added',
      Number(this.hotelRating) || 4.0,
      ['WiFi', 'Parking']
    );

    const managerResult = this.authService.addManagerByAdmin(
      this.managerName,
      this.managerEmail,
      this.managerPassword,
      hotel.id,
      hotel.name
    );

    this.message = managerResult.message;
    if (!managerResult.success) {
      return;
    }

    this.hotelName = '';
    this.hotelCity = '';
    this.hotelRating = 4.0;
    this.managerName = '';
    this.managerEmail = '';
    this.managerPassword = '';

    this.reloadData();
  }

  private reloadData(): void {
    this.hotels = this.hotelService.getHotels();
    this.bookingUsers = this.bookingService.getBookings().map((booking) => ({
      userEmail: booking.userEmail,
      guestName: booking.guestName,
      hotelName: this.hotelService.getHotelById(booking.hotelId)?.name || `Hotel ${booking.hotelId}`,
      roomId: booking.roomId,
      status: booking.status
    }));
  }
}
