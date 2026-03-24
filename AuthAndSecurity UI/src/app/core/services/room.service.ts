import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateRoomDto, Room, UpdateRoomDto } from '../../models/room.model';

@Injectable({ providedIn: 'root' })
export class RoomService {
  private readonly baseUrl = `${environment.apiBaseUrl}/room`;

  constructor(private readonly http: HttpClient) {}

  getRoomsByHotel(hotelId: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/hotel/${hotelId}`);
  }

  addRoom(payload: CreateRoomDto): Observable<Room> {
    return this.http.post<Room>(this.baseUrl, payload);
  }

  updateRoom(roomId: number, payload: UpdateRoomDto): Observable<Room> {
    return this.http.put<Room>(`${this.baseUrl}/${roomId}`, payload);
  }
}
