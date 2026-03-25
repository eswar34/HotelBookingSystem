import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { LoginComponent } from './modules/auth/login/login';
import { LoginSuccessComponent } from './modules/auth/login-success/login-success';
import { RegisterComponent } from './modules/auth/register/register';
import { AdminBookingsComponent } from './modules/admin/bookings/bookings';
import { CustomerMyBookingsComponent } from './modules/customer/my-bookings/my-bookings';

export const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'login-success', component: LoginSuccessComponent },
	{ path: 'register', component: RegisterComponent },
	{
		path: 'admin/bookings',
		component: AdminBookingsComponent,
		canActivate: [authGuard, roleGuard],
		data: { roles: ['Admin'] }
	},
	{
		path: 'customer/my-bookings',
		component: CustomerMyBookingsComponent,
		canActivate: [authGuard, roleGuard],
		data: { roles: ['Customer'] }
	},
	{ path: '**', redirectTo: '' }
];
