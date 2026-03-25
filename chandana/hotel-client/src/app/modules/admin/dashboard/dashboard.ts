import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService, ManagerRequest, UserListItem } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [NgFor, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class AdminDashboardComponent {
  managers: ManagerRequest[] = [];
  users: UserListItem[] = [];

  constructor(private authService: AuthService) {
    this.managers = this.authService.getAllManagers();
    this.users = this.authService.getAllUsers();
  }
}
