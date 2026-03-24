import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Amenity } from '../../models/amenity.model';

@Injectable({ providedIn: 'root' })
export class AmenityService {
  private readonly http = inject(HttpClient);

  getAmenities(): Observable<Amenity[]> {
    return this.http.get<Amenity[]>(`${environment.apiBaseUrl}/amenity`);
  }
}
