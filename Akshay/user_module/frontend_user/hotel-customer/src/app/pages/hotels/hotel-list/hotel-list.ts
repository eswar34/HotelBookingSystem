import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AmenityService } from '../../../core/services/amenity.service';
import { HotelService } from '../../../core/services/hotel.service';
import { Hotel } from '../../../models/hotel.model';
import { HotelCardComponent } from '../../../shared/components/hotel-card/hotel-card';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HotelCardComponent],
  templateUrl: './hotel-list.html',
  styleUrl: './hotel-list.scss'
})
export class HotelListPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly hotelService = inject(HotelService);
  private readonly amenityService = inject(AmenityService);

  readonly roomTypes = ['All Types', 'Deluxe', 'Suite', 'Standard', 'Single', 'Double', 'Twin'];
  amenityOptions: string[] = ['All Amenities'];
  hotels: Hotel[] = [];
  loading = false;
  errorMessage = '';
  dateError = '';
  readonly minCheckInDate = this.toDateInputValue(new Date());

  readonly searchForm = this.fb.nonNullable.group({
    location: [''],
    roomType: ['All Types'],
    minPrice: [''],
    maxPrice: [''],
    checkInDate: [''],
    checkOutDate: [''],
    amenity: ['All Amenities']
  });

  ngOnInit(): void {
    this.amenityService.getAmenities().subscribe({
      next: (amenities) => {
        this.amenityOptions = ['All Amenities', ...amenities.map((item) => item.name)];
      }
    });

    this.route.queryParams.subscribe((params) => {
      this.searchForm.patchValue({
        location: params['location'] ?? params['city'] ?? '',
        roomType: params['roomType'] ?? 'All Types',
        minPrice: params['minPrice'] ?? '',
        maxPrice: params['maxPrice'] ?? '',
        checkInDate: params['checkInDate'] ?? '',
        checkOutDate: params['checkOutDate'] ?? '',
        amenity: params['amenity'] ?? 'All Amenities'
      });
      this.loadHotels();
    });
  }

  onSearch(): void {
    const raw = this.searchForm.getRawValue();
    const queryParams: Record<string, string> = {};

    const dateError = this.getDateValidationError(raw.checkInDate, raw.checkOutDate);
    if (dateError) {
      this.dateError = dateError;
      return;
    }

    this.dateError = '';

    if (raw.location.trim()) queryParams['location'] = raw.location.trim();
    if (raw.roomType !== 'All Types') queryParams['roomType'] = raw.roomType;
    if (raw.minPrice.trim()) queryParams['minPrice'] = raw.minPrice.trim();
    if (raw.maxPrice.trim()) queryParams['maxPrice'] = raw.maxPrice.trim();
    if (raw.checkInDate) queryParams['checkInDate'] = raw.checkInDate;
    if (raw.checkOutDate) queryParams['checkOutDate'] = raw.checkOutDate;
    if (raw.amenity !== 'All Amenities') queryParams['amenity'] = raw.amenity;

    this.router.navigate(['/hotels'], { queryParams });
  }

  onViewDetails(hotelId: number): void {
    this.router.navigate(['/hotels', hotelId]);
  }

  private loadHotels(): void {
    const raw = this.searchForm.getRawValue();
    const hasServerFilters = !!raw.location.trim() || raw.roomType !== 'All Types' || !!raw.minPrice.trim() || !!raw.maxPrice.trim();

    const dateError = this.getDateValidationError(raw.checkInDate, raw.checkOutDate);
    if (dateError) {
      this.dateError = dateError;
      this.hotels = [];
      return;
    }

    this.dateError = '';

    this.loading = true;
    this.errorMessage = '';

    const request$ = hasServerFilters
      ? this.hotelService.searchHotels({
          city: raw.location,
          roomType: raw.roomType === 'All Types' ? '' : raw.roomType,
          minPrice: raw.minPrice.trim() ? Number(raw.minPrice) : null,
          maxPrice: raw.maxPrice.trim() ? Number(raw.maxPrice) : null
        })
      : this.hotelService.getAllHotels();

    request$.subscribe({
      next: (hotels) => {
        this.hotels = this.applyClientFilters(hotels, raw.location, raw.amenity);
      },
      error: () => {
        this.errorMessage = 'Unable to load hotels right now.';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  private applyClientFilters(hotels: Hotel[], location: string, amenity: string): Hotel[] {
    const locationText = location.trim().toLowerCase();

    return hotels.filter((hotel) => {
      const locationMatch = !locationText || hotel.city.toLowerCase().includes(locationText) || hotel.location.toLowerCase().includes(locationText);
      const amenityMatch = amenity === 'All Amenities' || hotel.amenities.some((item) => item.toLowerCase() === amenity.toLowerCase());
      return locationMatch && amenityMatch;
    });
  }

  private hasValidDates(checkInDate: string, checkOutDate: string): boolean {
    if (checkInDate) {
      const today = this.toDateInputValue(new Date());
      if (checkInDate < today) {
        return false;
      }
    }

    if (!checkInDate || !checkOutDate) {
      return true;
    }

    return new Date(checkOutDate).getTime() > new Date(checkInDate).getTime();
  }

  get minCheckOutDate(): string {
    return this.searchForm.controls.checkInDate.value || this.minCheckInDate;
  }

  private getDateValidationError(checkInDate: string, checkOutDate: string): string {
    if (checkInDate) {
      const today = this.toDateInputValue(new Date());
      if (checkInDate < today) {
        return 'Check-in date must be today or a future date.';
      }
    }

    if (checkInDate && checkOutDate && new Date(checkOutDate).getTime() <= new Date(checkInDate).getTime()) {
      return 'Check-out date must be after check-in date.';
    }

    return '';
  }

  private toDateInputValue(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
