import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Amenity } from '../../models/amenity.model';
import { CreateManagerDto, Hotel, UpdateHotelDto } from '../../models/hotel.model';

export interface HotelSearchParams {
  city?: string;
  roomType?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
}

@Injectable({ providedIn: 'root' })
export class HotelService {
  private readonly baseUrl = `${environment.apiBaseUrl}`;

  constructor(private readonly http: HttpClient) {}

  getApprovedHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.baseUrl}/hotel`);
  }

  searchHotels(params: HotelSearchParams): Observable<Hotel[]> {
    let httpParams = new HttpParams();
    if (params.city) {
      httpParams = httpParams.set('city', params.city);
    }
    if (params.roomType) {
      httpParams = httpParams.set('roomType', params.roomType);
    }
    if (params.minPrice !== null && params.minPrice !== undefined) {
      httpParams = httpParams.set('minPrice', params.minPrice);
    }
    if (params.maxPrice !== null && params.maxPrice !== undefined) {
      httpParams = httpParams.set('maxPrice', params.maxPrice);
    }

    return this.http.get<Hotel[]>(`${this.baseUrl}/hotel/search`, { params: httpParams });
  }

  getHotelById(hotelId: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.baseUrl}/hotel/${hotelId}`);
  }

  getMyHotel(): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.baseUrl}/hotel/my-hotel`);
  }

  updateHotel(hotelId: number, payload: UpdateHotelDto): Observable<Hotel> {
    return this.http.put<Hotel>(`${this.baseUrl}/hotel/${hotelId}`, payload);
  }

  addAmenityToMyHotel(amenityId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/hotel/amenities/${amenityId}`, {});
  }

  getAmenities(): Observable<Amenity[]> {
    return this.http.get<Amenity[]>(`${this.baseUrl}/amenity`);
  }

  getAllHotelsAdmin(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.baseUrl}/admin/hotels`);
  }

  approveHotel(hotelId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/admin/hotels/${hotelId}/approve`, {});
  }

  getManagers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/admin/managers`);
  }

  createManagerWithHotel(payload: CreateManagerDto): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/admin/managers`, payload);
  }
}
