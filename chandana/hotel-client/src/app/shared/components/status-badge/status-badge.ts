import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.scss'
})
export class StatusBadgeComponent {
  @Input() status = 'pending';

  get statusClass(): string {
    return this.status.toLowerCase();
  }
}
