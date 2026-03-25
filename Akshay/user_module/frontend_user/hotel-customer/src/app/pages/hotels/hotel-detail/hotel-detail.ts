import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HotelService } from '../../../core/services/hotel.service';
import { RoomService } from '../../../core/services/room.service';
import { AuthService } from '../../../core/services/auth.service';
import { Hotel } from '../../../models/hotel.model';
import { Room } from '../../../models/room.model';
import { RoomCardComponent } from '../../../shared/components/room-card/room-card';
import { BookRoomPage } from '../../booking/book-room/book-room';

@Component({
  selector: 'app-hotel-detail',
  standalone: true,
  imports: [CommonModule, RoomCardComponent, BookRoomPage],
  templateUrl: './hotel-detail.html',
  styleUrl: './hotel-detail.scss'
})
export class HotelDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly hotelService = inject(HotelService);
  private readonly roomService = inject(RoomService);
  private readonly authService = inject(AuthService);

  loading = false;
  errorMessage = '';
  hotel: Hotel | null = null;
  rooms: Room[] = [];
  selectedRoom: Room | null = null;

  ngOnInit(): void {
    const hotelId = Number(this.route.snapshot.paramMap.get('id'));
    if (!hotelId) {
      this.errorMessage = 'Invalid hotel id.';
      return;
    }

    this.loadHotelDetails(hotelId);
  }

  onBookNow(room: Room): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.selectedRoom = room;
  }

  onBookingSuccess(): void {
    if (this.selectedRoom) {
      this.rooms = this.rooms.map((room) =>
        room.roomId === this.selectedRoom!.roomId
          ? { ...room, availableRooms: Math.max(0, room.availableRooms - 1) }
          : room
      );
    }

    this.selectedRoom = null;
    this.router.navigate(['/my-bookings']);
  }

  onCloseBooking(): void {
    this.selectedRoom = null;
  }

  private loadHotelDetails(hotelId: number): void {
    this.loading = true;
    this.errorMessage = '';

    this.hotelService.getHotelById(hotelId).subscribe({
      next: (hotel) => {
        this.hotel = hotel;
      },
      error: () => {
        this.errorMessage = 'Unable to load hotel details.';
        this.loading = false;
      }
    });

    this.roomService.getRoomsByHotelId(hotelId).subscribe({
      next: (rooms) => {
        this.rooms = rooms;
      },
      error: () => {
        this.errorMessage = this.errorMessage || 'Unable to load rooms.';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
