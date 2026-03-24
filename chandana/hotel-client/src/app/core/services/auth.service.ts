import { Injectable } from '@angular/core';

type UserRole = 'admin' | 'manager' | 'user';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisteredUser {
  name: string;
  email: string;
  password: string;
  role: 'manager' | 'user';
  managedHotelId?: number;
  managedHotelName?: string;
  approvalStatus?: 'pending' | 'approved';
}

export interface ManagerRequest {
  name: string;
  email: string;
  managedHotelId: number;
  managedHotelName: string;
  approvalStatus: 'pending' | 'approved';
}

export interface UserListItem {
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'hb_token';
  private readonly userKey = 'hb_user';
  private readonly usersKey = 'hb_registered_users';
  private lastAuthError = '';

  login(payload: LoginPayload): boolean {
    this.lastAuthError = '';

    if (!payload.email || !payload.password) {
      this.lastAuthError = 'Please provide email and password.';
      return false;
    }

    const isAdmin = payload.email === 'admin@hotel.com' && payload.password === 'admin123';
    if (isAdmin) {
      const user = { email: payload.email, role: 'admin' };
      localStorage.setItem(this.tokenKey, 'demo-token-123');
      localStorage.setItem(this.userKey, JSON.stringify(user));
      return true;
    }

    const users = this.getRegisteredUsers();
    const matchedUser = users.find((user) => user.email === payload.email && user.password === payload.password);

    if (!matchedUser) {
      this.lastAuthError = 'Invalid credentials for the selected role.';
      return false;
    }

    if (matchedUser.role === 'manager' && matchedUser.approvalStatus !== 'approved') {
      this.lastAuthError = 'Manager account is pending admin approval.';
      return false;
    }

    const user = {
      email: matchedUser.email,
      role: matchedUser.role,
      managedHotelId: matchedUser.managedHotelId,
      managedHotelName: matchedUser.managedHotelName
    };

    localStorage.setItem(this.tokenKey, 'demo-token-123');
    localStorage.setItem(this.userKey, JSON.stringify(user));
    return true;
  }

  register(name: string, email: string, password: string): boolean {
    this.lastAuthError = '';

    if (!name || !email || !password) {
      this.lastAuthError = 'Please fill all required fields.';
      return false;
    }

    const users = this.getRegisteredUsers();
    const userExists = users.some((user) => user.email === email && user.role === 'user');

    if (userExists) {
      this.lastAuthError = 'This email is already registered for the selected role.';
      return false;
    }

    const newUser: RegisteredUser = {
      name,
      email,
      password,
      role: 'user',
      approvalStatus: 'approved'
    };
    localStorage.setItem(this.usersKey, JSON.stringify([...users, newUser]));

    const user = {
      name,
      email,
      role: 'user',
      managedHotelId: newUser.managedHotelId,
      managedHotelName: newUser.managedHotelName
    };
    localStorage.setItem(this.tokenKey, 'demo-token-123');
    localStorage.setItem(this.userKey, JSON.stringify(user));
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey) || '';
  }

  getRole(): string {
    const raw = localStorage.getItem(this.userKey);
    if (!raw) {
      return '';
    }

    try {
      return JSON.parse(raw).role || '';
    } catch {
      return '';
    }
  }

  getUserEmail(): string {
    const raw = localStorage.getItem(this.userKey);
    if (!raw) {
      return '';
    }

    try {
      return JSON.parse(raw).email || '';
    } catch {
      return '';
    }
  }

  getManagedHotelId(): number {
    const raw = localStorage.getItem(this.userKey);
    if (!raw) {
      return 1;
    }

    try {
      return Number(JSON.parse(raw).managedHotelId) || 1;
    } catch {
      return 1;
    }
  }

  getManagedHotelName(): string {
    const raw = localStorage.getItem(this.userKey);
    if (!raw) {
      return '';
    }

    try {
      return JSON.parse(raw).managedHotelName || '';
    } catch {
      return '';
    }
  }

  getLastAuthError(): string {
    return this.lastAuthError;
  }

  getManagersByStatus(status: 'pending' | 'approved'): ManagerRequest[] {
    return this.getRegisteredUsers()
      .filter((user) => user.role === 'manager' && user.approvalStatus === status)
      .map((manager) => ({
        name: manager.name,
        email: manager.email,
        managedHotelId: manager.managedHotelId || 1,
        managedHotelName: manager.managedHotelName || 'Unknown Hotel',
        approvalStatus: manager.approvalStatus || 'pending'
      }));
  }

  getAllManagers(): ManagerRequest[] {
    return this.getRegisteredUsers()
      .filter((user) => user.role === 'manager')
      .map((manager) => ({
        name: manager.name,
        email: manager.email,
        managedHotelId: manager.managedHotelId || 1,
        managedHotelName: manager.managedHotelName || 'Unknown Hotel',
        approvalStatus: manager.approvalStatus || 'pending'
      }));
  }

  getAllUsers(): UserListItem[] {
    return this.getRegisteredUsers()
      .filter((user) => user.role === 'user')
      .map((user) => ({
        name: user.name,
        email: user.email
      }));
  }

  approveManager(email: string): boolean {
    const users = this.getRegisteredUsers();
    let updated = false;

    const nextUsers = users.map((user) => {
      if (user.role === 'manager' && user.email === email) {
        updated = true;
        return {
          ...user,
          approvalStatus: 'approved' as const
        };
      }

      return user;
    });

    if (updated) {
      localStorage.setItem(this.usersKey, JSON.stringify(nextUsers));
    }

    return updated;
  }

  addManagerByAdmin(
    managerName: string,
    managerEmail: string,
    managerPassword: string,
    managedHotelId: number,
    managedHotelName: string
  ): { success: boolean; message: string } {
    this.lastAuthError = '';

    if (!managerName || !managerEmail || !managerPassword || !managedHotelId || !managedHotelName) {
      return {
        success: false,
        message: 'Please provide manager details and hotel details.'
      };
    }

    const users = this.getRegisteredUsers();
    const alreadyExists = users.some((user) => user.email === managerEmail && user.role === 'manager');
    if (alreadyExists) {
      return {
        success: false,
        message: 'Manager email already exists.'
      };
    }

    const manager: RegisteredUser = {
      name: managerName,
      email: managerEmail,
      password: managerPassword,
      role: 'manager',
      managedHotelId,
      managedHotelName,
      approvalStatus: 'approved'
    };

    localStorage.setItem(this.usersKey, JSON.stringify([...users, manager]));
    return {
      success: true,
      message: `Hotel added and manager credentials sent to ${managerEmail} (demo).`
    };
  }

  private getRegisteredUsers(): RegisteredUser[] {
    const raw = localStorage.getItem(this.usersKey);
    if (!raw) {
      return [];
    }

    try {
      return JSON.parse(raw) as RegisteredUser[];
    } catch {
      return [];
    }
  }

}
