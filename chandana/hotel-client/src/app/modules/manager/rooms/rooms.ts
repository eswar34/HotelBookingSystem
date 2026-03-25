import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Room, RoomService } from '../../../core/services/room.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-rooms',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './rooms.html',
  styleUrl: './rooms.scss'
})
export class RoomsComponent {
  rooms: Room[] = [];
  managedHotelId = 1;
  roomType = '';
  price = 0;
  availableCount = 1;
  message = '';

  constructor(private roomService: RoomService, private authService: AuthService) {
    this.managedHotelId = this.authService.getManagedHotelId();
    this.loadRooms();
  }

  addRoom(): void {
    if (!this.roomType.trim() || this.price <= 0 || this.availableCount < 0) {
      this.message = 'Enter valid room type, price, and available count.';
      return;
    }

    const newRoom: Room = {
      id: 0,
      hotelId: this.managedHotelId,
      roomType: this.roomType.trim(),
      title: this.roomType.trim(),
      price: this.price,
      availableCount: this.availableCount,
      status: this.availableCount > 0 ? 'available' : 'booked'
    };

    this.roomService.addRoom(newRoom).subscribe({
      next: () => {
        this.roomType = '';
        this.price = 0;
        this.availableCount = 1;
        this.message = 'Room added successfully.';
        this.loadRooms();
      },
      error: () => {
        this.message = 'Unable to add room right now. Please try again.';
      }
    });
  }

  saveRoom(room: Room): void {
    if (!room.roomType.trim() || room.price <= 0 || room.availableCount < 0) {
      this.message = 'Please keep valid values for room details.';
      return;
    }

    const updatedRoom: Room = {
      ...room,
      roomType: room.roomType.trim(),
      title: room.title?.trim() ? room.title.trim() : room.roomType.trim(),
      status: room.availableCount > 0 ? 'available' : 'booked'
    };

    this.roomService.updateRoom(room.id, updatedRoom).subscribe({
      next: () => {
        this.message = 'Room updated successfully.';
        this.loadRooms();
      },
      error: () => {
        this.message = 'Unable to update room right now. Please try again.';
      }
    });
  }

  private loadRooms(): void {
    this.roomService.getRoomsByHotel(this.managedHotelId).subscribe({
      next: (rooms) => {
        this.rooms = rooms;
      },
      error: () => {
        this.rooms = [];
        this.message = 'Unable to load rooms right now.';
      }
    });
  }
}
