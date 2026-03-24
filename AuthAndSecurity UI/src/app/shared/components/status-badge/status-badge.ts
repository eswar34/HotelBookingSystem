import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [NgClass],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.scss'
})
export class StatusBadgeComponent {
  @Input({ required: true }) status = '';

  get statusClass(): string {
    const current = this.status.toLowerCase();
    if (current === 'approved') {
      return 'approved';
    }
    if (current === 'pending') {
      return 'pending';
    }
    if (current === 'cancelled') {
      return 'cancelled';
    }
    if (current === 'confirmed') {
      return 'confirmed';
    }
    return 'default';
  }
}
