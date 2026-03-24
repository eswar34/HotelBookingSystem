import { Injectable } from '@angular/core';

export interface Room {
  id: number;
  hotelId: number;
  roomType: string;
  title: string;
  price: number;
  availableCount: number;
  status: 'available' | 'booked';
}

@Injectable({ providedIn: 'root' })
export class RoomService {
  private readonly roomsKey = 'hb_rooms';
  private rooms: Room[] = [];

  constructor() {
    const stored = this.readRoomsFromStorage();
    if (stored.length) {
      this.rooms = stored;
      return;
    }

    this.rooms = [
      { id: 101, hotelId: 1, roomType: 'Deluxe Room', title: 'Deluxe Room', price: 3500, availableCount: 6, status: 'available' },
      { id: 102, hotelId: 1, roomType: 'Sea View Suite', title: 'Sea View Suite', price: 5500, availableCount: 3, status: 'available' },
      { id: 201, hotelId: 2, roomType: 'Family Room', title: 'Family Room', price: 4200, availableCount: 0, status: 'booked' },
      { id: 301, hotelId: 3, roomType: 'Business Room', title: 'Business Room', price: 3900, availableCount: 4, status: 'available' }
    ];
    this.saveRoomsToStorage();
  }

  getRoomsByHotel(hotelId: number): Room[] {
    return this.rooms.filter((room) => room.hotelId === hotelId);
  }

  getRoomById(roomId: number): Room | undefined {
    return this.rooms.find((room) => room.id === roomId);
  }

  addRoom(hotelId: number, roomType: string, price: number, availableCount: number): Room {
    const trimmedType = roomType.trim();
    const nextRoom: Room = {
      id: Date.now(),
      hotelId,
      roomType: trimmedType,
      title: trimmedType,
      price,
      availableCount,
      status: availableCount > 0 ? 'available' : 'booked'
    };

    this.rooms = [nextRoom, ...this.rooms];
    this.saveRoomsToStorage();
    return nextRoom;
  }

  updateRoom(roomId: number, roomType: string, price: number, availableCount: number): boolean {
    let changed = false;
    this.rooms = this.rooms.map((room) => {
      if (room.id !== roomId) {
        return room;
      }

      changed = true;
      const trimmedType = roomType.trim();
      return {
        ...room,
        roomType: trimmedType,
        title: trimmedType,
        price,
        availableCount,
        status: availableCount > 0 ? 'available' : 'booked'
      };
    });

    if (changed) {
      this.saveRoomsToStorage();
    }

    return changed;
  }

  private readRoomsFromStorage(): Room[] {
    const raw = localStorage.getItem(this.roomsKey);
    if (!raw) {
      return [];
    }

    try {
      return JSON.parse(raw) as Room[];
    } catch {
      return [];
    }
  }

  private saveRoomsToStorage(): void {
    localStorage.setItem(this.roomsKey, JSON.stringify(this.rooms));
  }
}
