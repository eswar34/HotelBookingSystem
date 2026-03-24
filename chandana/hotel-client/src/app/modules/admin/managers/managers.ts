import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { AuthService, ManagerRequest } from '../../../core/services/auth.service';

@Component({
  selector: 'app-managers',
  imports: [NgFor, NgIf],
  templateUrl: './managers.html',
  styleUrl: './managers.scss'
})
export class ManagersComponent {
  pendingManagers: ManagerRequest[] = [];
  approvedManagers: ManagerRequest[] = [];
  message = '';

  constructor(private authService: AuthService) {
    this.loadManagers();
  }

  approve(email: string): void {
    const updated = this.authService.approveManager(email);
    if (updated) {
      this.message = 'Manager approved successfully.';
      this.loadManagers();
      return;
    }

    this.message = 'Could not approve manager.';
  }

  private loadManagers(): void {
    this.pendingManagers = this.authService.getManagersByStatus('pending');
    this.approvedManagers = this.authService.getManagersByStatus('approved');
  }
}
