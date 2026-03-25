import { Injectable } from '@angular/core';

export interface Hotel {
  id: number;
  name: string;
  city: string;
  rating: number;
  amenities: string[];
}

@Injectable({ providedIn: 'root' })
export class HotelService {
  private readonly hotelsKey = 'hb_hotels';
  private hotels: Hotel[] = [];

  constructor() {
    const storedHotels = this.readHotelsFromStorage();
    if (storedHotels.length) {
      this.hotels = storedHotels;
      return;
    }

    this.hotels = [
      { id: 1, name: 'Ocean View Resort', city: 'Goa', rating: 4.5, amenities: ['Pool', 'WiFi', 'Breakfast'] },
      { id: 2, name: 'Mountain Nest Hotel', city: 'Manali', rating: 4.2, amenities: ['Parking', 'Heater', 'WiFi'] },
      { id: 3, name: 'City Star Stay', city: 'Bengaluru', rating: 4.0, amenities: ['Gym', 'WiFi', 'Restaurant'] }
    ];
    this.saveHotelsToStorage();
  }

  getHotels(): Hotel[] {
    return [...this.hotels];
  }

  getHotelById(id: number): Hotel | undefined {
    return this.hotels.find((hotel) => hotel.id === id);
  }

  addHotel(name: string, city = 'Manager Added', rating = 4.0, amenities: string[] = ['WiFi']): Hotel {
    const cleanedName = name.trim();
    const existing = this.hotels.find((hotel) => hotel.name.toLowerCase() === cleanedName.toLowerCase());
    if (existing) {
      return existing;
    }

    const newHotel: Hotel = {
      id: Date.now(),
      name: cleanedName,
      city,
      rating,
      amenities
    };

    this.hotels = [newHotel, ...this.hotels];
    this.saveHotelsToStorage();
    return newHotel;
  }

  private readHotelsFromStorage(): Hotel[] {
    const raw = localStorage.getItem(this.hotelsKey);
    if (!raw) {
      return [];
    }

    try {
      return JSON.parse(raw) as Hotel[];
    } catch {
      return [];
    }
  }

  private saveHotelsToStorage(): void {
    localStorage.setItem(this.hotelsKey, JSON.stringify(this.hotels));
  }
}
