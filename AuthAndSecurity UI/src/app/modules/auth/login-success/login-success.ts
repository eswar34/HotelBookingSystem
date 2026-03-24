import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-success',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login-success.html',
  styleUrl: './login-success.scss'
})
export class LoginSuccessComponent {}
