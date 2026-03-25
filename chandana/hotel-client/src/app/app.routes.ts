import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { LoginComponent } from './modules/auth/login/login';
import { RegisterComponent } from './modules/auth/register/register';
import { AdminDashboardComponent } from './modules/admin/dashboard/dashboard';
import { ManagersComponent } from './modules/admin/managers/managers';
import { AdminHotelsComponent } from './modules/admin/hotels/hotels';
import { ManagerDashboardComponent } from './modules/manager/dashboard/dashboard';
import { HotelProfileComponent } from './modules/manager/hotel-profile/hotel-profile';
import { RoomsComponent } from './modules/manager/rooms/rooms';
import { BookingsComponent } from './modules/manager/bookings/bookings';
import { CustomerDashboardComponent } from './modules/customer/dashboard/dashboard';
import { CustomerHotelsComponent } from './modules/customer/hotels/hotels';
import { HotelDetailComponent } from './modules/customer/hotel-detail/hotel-detail';
import { BookingComponent } from './modules/customer/booking/booking';
import { MyBookingsComponent } from './modules/customer/my-bookings/my-bookings';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' }
  },
  {
    path: 'admin/managers',
    component: ManagersComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' }
  },
  {
    path: 'admin/hotels',
    component: AdminHotelsComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' }
  },

  {
    path: 'manager/dashboard',
    component: ManagerDashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'manager' }
  },
  {
    path: 'manager/hotel-profile',
    component: HotelProfileComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'manager' }
  },
  {
    path: 'manager/rooms',
    component: RoomsComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'manager' }
  },
  {
    path: 'manager/bookings',
    component: BookingsComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'manager' }
  },

  {
    path: 'user/dashboard',
    component: CustomerDashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'user' }
  },
  {
    path: 'user/hotels',
    component: CustomerHotelsComponent
  },
  {
    path: 'user/hotel-detail/:id',
    component: HotelDetailComponent
  },
  {
    path: 'user/booking/:hotelId/:roomId',
    component: BookingComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'user' }
  },
  {
    path: 'user/my-bookings',
    component: MyBookingsComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'user' }
  },

  { path: 'customer/dashboard', redirectTo: 'user/dashboard', pathMatch: 'full' },
  { path: 'customer/hotels', redirectTo: 'user/hotels', pathMatch: 'full' },
  { path: 'customer/hotel-detail/:id', redirectTo: 'user/hotel-detail/:id', pathMatch: 'full' },
  { path: 'customer/booking/:hotelId/:roomId', redirectTo: 'user/booking/:hotelId/:roomId', pathMatch: 'full' },
  { path: 'customer/my-bookings', redirectTo: 'user/my-bookings', pathMatch: 'full' },

  { path: '**', redirectTo: 'register' }
];
