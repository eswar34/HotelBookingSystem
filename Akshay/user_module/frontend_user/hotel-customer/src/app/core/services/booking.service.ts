import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Booking, CreateBookingDto } from '../../models/booking.model';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/booking`;

  createBooking(payload: CreateBookingDto): Observable<Booking> {
    return this.http.post<Booking>(this.baseUrl, payload);
  }

  getMyBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/my`);
  }

  cancelBooking(bookingId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${bookingId}/cancel`, {});
  }
}
