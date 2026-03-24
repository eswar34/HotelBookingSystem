import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthResponse, LoginDto, RegisterDto, User, UserProfileDetails } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/auth`;

  login(payload: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, payload);
  }

  register(payload: RegisterDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, payload);
  }

  setSession(auth: AuthResponse): void {
    const token = auth.token ?? '';
    const user: User = auth.user ?? {
      userId: auth.userId ?? 0,
      fullName: auth.fullName ?? 'Customer User',
      email: auth.email ?? '',
      role: 'Customer'
    };

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    const profileDetails: UserProfileDetails = {
      address: '12 MG Road, Bengaluru, Karnataka',
      gender: 'Male',
      phoneNumber: '+91 9876543210',
      country: 'India'
    };
    localStorage.setItem('profileDetails', JSON.stringify(profileDetails));

    if (!localStorage.getItem('memberSince')) {
      localStorage.setItem('memberSince', new Date().toISOString());
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUser(): User | null {
    const userRaw = localStorage.getItem('user');
    if (!userRaw) {
      return null;
    }

    try {
      return JSON.parse(userRaw) as User;
    } catch {
      return null;
    }
  }
}
