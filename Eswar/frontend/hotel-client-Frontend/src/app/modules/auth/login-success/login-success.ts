import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login-success',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login-success.html',
  styleUrl: './login-success.scss'
})
export class LoginSuccessComponent {
  private readonly authService = inject(AuthService);

  readonly nextRoute = computed(() => {
    const role = this.authService.currentUser()?.role;
    if (role === 'Admin') {
      return '/admin/bookings';
    }
    if (role === 'Customer') {
      return '/customer/my-bookings';
    }
    return '/login';
  });

  readonly nextLabel = computed(() => {
    const role = this.authService.currentUser()?.role;
    if (role === 'Admin') {
      return 'Go to All Bookings';
    }
    if (role === 'Customer') {
      return 'Go to My Bookings';
    }
    return 'Back to Login';
  });
}
