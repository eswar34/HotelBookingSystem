import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Booking } from '../../models/booking.model';
import { CreateBookingDto } from '../../models/booking.model';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly apiBaseUrl = environment.apiBaseUrl;
  private readonly baseUrl = `${environment.apiBaseUrl}/booking`;

  constructor(private readonly http: HttpClient) {}

  getMyBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/my`);
  }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.baseUrl);
  }

  createBooking(payload: CreateBookingDto): Observable<Booking> {
    return this.http.post<Booking>(this.baseUrl, payload).pipe(
      catchError((err) => {
        if (err?.status === 404) {
          return this.http.post<Booking>(`${this.apiBaseUrl}/Booking`, payload);
        }
        return throwError(() => err);
      })
    );
  }

  cancelBooking(bookingId: number): Observable<Booking> {
    return this.http.put<Booking>(`${this.baseUrl}/${bookingId}/cancel`, {}).pipe(
      catchError((err) => {
        if (err?.status === 404) {
          return this.http.put<Booking>(`${this.apiBaseUrl}/Booking/${bookingId}/cancel`, {});
        }
        return throwError(() => err);
      })
    );
  }
}
