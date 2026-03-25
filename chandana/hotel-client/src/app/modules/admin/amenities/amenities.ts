import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-amenities',
  imports: [NgFor],
  templateUrl: './amenities.html',
  styleUrl: './amenities.scss'
})
export class AmenitiesComponent {
  amenities = ['Pool', 'Gym', 'WiFi', 'Breakfast', 'Parking'];
}
