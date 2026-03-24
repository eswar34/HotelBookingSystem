import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Hotel, HotelService } from '../../../core/services/hotel.service';
import { RoomService } from '../../../core/services/room.service';

interface HotelFilterView {
  id: number;
  name: string;
  city: string;
  rating: number;
  minPrice: number;
  roomTypes: string[];
}

@Component({
  selector: 'app-customer-hotels',
  imports: [NgFor, NgIf, FormsModule, RouterLink],
  templateUrl: './hotels.html',
  styleUrl: './hotels.scss'
})
export class CustomerHotelsComponent {
  hotels: HotelFilterView[] = [];
  filteredHotels: HotelFilterView[] = [];

  location = '';
  roomType = '';
  minPrice = 0;
  maxPrice = 10000;
  checkInDate = '';
  checkOutDate = '';

  constructor(private hotelService: HotelService, private roomService: RoomService) {
    this.hotels = this.hotelService.getHotels().map((hotel: Hotel) => {
      const rooms = this.roomService.getRoomsByHotel(hotel.id);
      const prices = rooms.map((room) => room.price);

      return {
        id: hotel.id,
        name: hotel.name,
        city: hotel.city,
        rating: hotel.rating,
        minPrice: prices.length ? Math.min(...prices) : 0,
        roomTypes: rooms.map((room) => room.title.toLowerCase())
      };
    });

    this.filteredHotels = [...this.hotels];
  }

  applyFilters(): void {
    const locationFilter = this.location.trim().toLowerCase();
    const typeFilter = this.roomType.trim().toLowerCase();
    const hasDateRange = !!this.checkInDate && !!this.checkOutDate;

    this.filteredHotels = this.hotels.filter((hotel) => {
      const locationOk = !locationFilter || hotel.city.toLowerCase().includes(locationFilter);
      const typeOk = !typeFilter || hotel.roomTypes.some((type) => type.includes(typeFilter));
      const priceOk = hotel.minPrice >= this.minPrice && hotel.minPrice <= this.maxPrice;

      // Frontend-only placeholder for backend-ready date filtering.
      const dateOk = !hasDateRange || this.checkInDate < this.checkOutDate;

      return locationOk && typeOk && priceOk && dateOk;
    });
  }

  resetFilters(): void {
    this.location = '';
    this.roomType = '';
    this.minPrice = 0;
    this.maxPrice = 10000;
    this.checkInDate = '';
    this.checkOutDate = '';
    this.filteredHotels = [...this.hotels];
  }
}
