import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StatusBadgeComponent } from '../status-badge/status-badge';

@Component({
  selector: 'app-room-card',
  imports: [StatusBadgeComponent],
  templateUrl: './room-card.html',
  styleUrl: './room-card.scss'
})
export class RoomCardComponent {
  @Input() title = '';
  @Input() price = 0;
  @Input() availableCount = 0;
  @Input() status = 'available';
  @Output() book = new EventEmitter<void>();
}
