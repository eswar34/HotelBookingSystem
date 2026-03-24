import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Room } from '../../../models/room.model';

@Component({
  selector: 'app-room-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-card.html',
  styleUrl: './room-card.scss'
})
export class RoomCardComponent {
  @Input({ required: true }) room!: Room;
  @Output() bookNow = new EventEmitter<Room>();

  onBookNow(): void {
    this.bookNow.emit(this.room);
  }
}
