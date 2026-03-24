import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Hotel } from '../../models/hotel.model';

export interface HotelSearchFilters {
  city?: string;
  roomType?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
}

@Injectable({ providedIn: 'root' })
export class HotelService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/hotel`;

  getAllHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.baseUrl);
  }

  searchHotels(filters: HotelSearchFilters): Observable<Hotel[]> {
    let params = new HttpParams();

    if (filters.city?.trim()) {
      params = params.set('city', filters.city.trim());
    }

    if (filters.roomType?.trim()) {
      params = params.set('roomType', filters.roomType.trim());
    }

    if (filters.minPrice !== null && filters.minPrice !== undefined) {
      params = params.set('minPrice', filters.minPrice.toString());
    }

    if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
      params = params.set('maxPrice', filters.maxPrice.toString());
    }

    return this.http.get<Hotel[]>(`${this.baseUrl}/search`, { params });
  }

  getHotelById(hotelId: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.baseUrl}/${hotelId}`);
  }
}
