import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { HotelService } from '../../../core/services/hotel.service';

@Component({
  selector: 'app-hotel-profile',
  imports: [FormsModule],
  templateUrl: './hotel-profile.html',
  styleUrl: './hotel-profile.scss'
})
export class HotelProfileComponent {
  hotelName = '';
  city = '';
  description = 'Only your assigned hotel details are visible here.';
  managedHotelId = 1;

  constructor(private authService: AuthService, private hotelService: HotelService) {
    this.managedHotelId = this.authService.getManagedHotelId();
    const hotel = this.hotelService.getHotelById(this.managedHotelId);
    this.hotelName = hotel?.name || this.authService.getManagedHotelName() || 'Assigned Hotel';
    this.city = hotel?.city || 'Manager Added';
  }

  saveProfile(): void {
    alert('Profile saved (demo).');
  }
}
