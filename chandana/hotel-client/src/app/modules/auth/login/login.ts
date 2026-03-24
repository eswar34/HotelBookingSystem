import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [NgIf, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const success = this.authService.login({
      email: this.email,
      password: this.password
    });

    if (!success) {
      this.errorMessage = this.authService.getLastAuthError() || 'Login failed.';
      return;
    }

    const role = this.authService.getRole();
    if (role === 'user') {
      this.router.navigate(['/user/dashboard']);
      return;
    }

    this.router.navigate([`/${role}/dashboard`]);
  }
}
