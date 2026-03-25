import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UserProfileDetails } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class ProfilePage {
  private readonly authService = inject(AuthService);
  readonly user = this.authService.getUser();
  readonly memberSince = localStorage.getItem('memberSince');

  readonly profileDetails: UserProfileDetails = this.getProfileDetails();

  private getProfileDetails(): UserProfileDetails {
    const raw = localStorage.getItem('profileDetails');
    if (!raw) {
      return {
        address: '12 MG Road, Bengaluru, Karnataka',
        gender: 'Male',
        phoneNumber: '+91 9876543210',
        country: 'India'
      };
    }

    try {
      return JSON.parse(raw) as UserProfileDetails;
    } catch {
      return {
        address: '12 MG Road, Bengaluru, Karnataka',
        gender: 'Male',
        phoneNumber: '+91 9876543210',
        country: 'India'
      };
    }
  }
}
