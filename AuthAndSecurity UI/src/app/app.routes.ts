import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login';
import { LoginSuccessComponent } from './modules/auth/login-success/login-success';
import { RegisterComponent } from './modules/auth/register/register';

export const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'login-success', component: LoginSuccessComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: '**', redirectTo: '' }
];
