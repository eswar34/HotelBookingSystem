import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [NgIf, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const success = this.authService.register(this.name, this.email, this.password);
    this.message = success ? 'Registration complete.' : this.authService.getLastAuthError();

    if (success) {
      this.router.navigate(['/user/dashboard']);
      return;
    }
  }
}
