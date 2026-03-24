import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { HomePage } from './pages/home/home';
import { LoginPage } from './pages/auth/login/login';
import { RegisterPage } from './pages/auth/register/register';
import { HotelListPage } from './pages/hotels/hotel-list/hotel-list';
import { HotelDetailPage } from './pages/hotels/hotel-detail/hotel-detail';
import { MyBookingsPage } from './pages/booking/my-bookings/my-bookings';
import { ProfilePage } from './pages/profile/profile';

export const routes: Routes = [
	{ path: '', component: HomePage },
	{ path: 'login', component: LoginPage },
	{ path: 'register', component: RegisterPage },
	{ path: 'hotels', component: HotelListPage },
	{ path: 'hotels/:id', component: HotelDetailPage },
	{ path: 'my-bookings', component: MyBookingsPage, canActivate: [authGuard] },
	{ path: 'profile', component: ProfilePage, canActivate: [authGuard] },
	{ path: '**', redirectTo: '' }
];
