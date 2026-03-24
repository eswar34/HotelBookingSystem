import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe, NgIf } from '@angular/common';
import { Room } from '../../../models/room.model';
import { StatusBadgeComponent } from '../status-badge/status-badge';

@Component({
  selector: 'app-room-card',
  standalone: true,
  imports: [CurrencyPipe, NgIf, StatusBadgeComponent],
  templateUrl: './room-card.html',
  styleUrl: './room-card.scss'
})
export class RoomCardComponent {
  @Input({ required: true }) room!: Room;
  @Input() showBookButton = false;
  @Output() book = new EventEmitter<Room>();

  onBook(): void {
    this.book.emit(this.room);
  }
}
