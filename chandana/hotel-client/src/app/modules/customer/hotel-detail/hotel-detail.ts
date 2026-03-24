import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService, Hotel } from '../../../core/services/hotel.service';
import { Room, RoomService } from '../../../core/services/room.service';
import { RoomCardComponent } from '../../../shared/components/room-card/room-card';

@Component({
  selector: 'app-hotel-detail',
  imports: [NgFor, NgIf, RoomCardComponent],
  templateUrl: './hotel-detail.html',
  styleUrl: './hotel-detail.scss'
})
export class HotelDetailComponent {
  hotel?: Hotel;
  rooms: Room[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService,
    private roomService: RoomService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.hotel = this.hotelService.getHotelById(id);
    this.rooms = this.roomService.getRoomsByHotel(id);
  }

  bookRoom(roomId: number): void {
    if (!this.hotel) {
      return;
    }

    this.router.navigate(['/user/booking', this.hotel.id, roomId]);
  }
}
