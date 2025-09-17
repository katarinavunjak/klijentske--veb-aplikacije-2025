import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { CartItemModel } from '../models/cart-item.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private storageKey = 'users';
  private activeKey = 'activeUser';

  private retrieveUsers(): UserModel[] {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem(this.storageKey)!);
  }

  private saveUsers(users: UserModel[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  register(user: UserModel): boolean {
    const users = this.retrieveUsers();
    if (users.find(u => u.email === user.email)) return false;
    users.push(user);
    this.saveUsers(users);
    return true;
  }

  login(email: string, password: string): boolean {
    const users = this.retrieveUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      localStorage.setItem(this.activeKey, email);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.activeKey);
  }

  getActiveUser(): UserModel | null {
    const email = localStorage.getItem(this.activeKey);
    if (!email) return null;
    return this.retrieveUsers().find(u => u.email === email) || null;
  }

  updateProfile(updated: UserModel): void {
    const users = this.retrieveUsers();
    const idx = users.findIndex(u => u.id === updated.id);
    if (idx !== -1) {
      users[idx] = updated;
      this.saveUsers(users);
    }
  }

  changePassword(newPassword: string): boolean {
    const active = this.getActiveUser();
    if (!active) return false;
    const users = this.retrieveUsers();
    const idx = users.findIndex(u => u.id === active.id);
    if (idx === -1) return false;
    users[idx].password = newPassword;
    this.saveUsers(users);
    localStorage.setItem(this.activeKey, users[idx].email);
    return true;
  }

  addToCart(item: CartItemModel): void {
    const active = this.getActiveUser();
    if (!active) return;
    const users = this.retrieveUsers();
    const idx = users.findIndex(u => u.id === active.id);
    if (idx !== -1) {
      const existing = users[idx].cart.find(c => c.projectionId === item.projectionId);
      if (existing) existing.count += item.count;
      else users[idx].cart.push(item);
      this.saveUsers(users);
    }
  }

  removeFromCart(projectionId: number): void {
    const active = this.getActiveUser();
    if (!active) return;
    const users = this.retrieveUsers();
    const idx = users.findIndex(u => u.id === active.id);
    if (idx !== -1) {
      users[idx].cart = users[idx].cart.filter(c => c.projectionId !== projectionId);
      this.saveUsers(users);
    }
  }

  changeProjectionStatus(
    projectionId: number,
    status: 'rezervisano' | 'gledano' | 'otkazano'
  ): void {
    const active = this.getActiveUser();
    if (!active) return;
    const users = this.retrieveUsers();
    const idx = users.findIndex(u => u.id === active.id);
    if (idx !== -1) {
      const item = users[idx].cart.find(c => c.projectionId === projectionId);
      if (item) {
        item.status = status;
        this.saveUsers(users);
      }
    }
  }

  rateProjection(projectionId: number, rating: number): void {
    const active = this.getActiveUser();
    if (!active) return;
    const users = this.retrieveUsers();
    const idx = users.findIndex(u => u.id === active.id);
    if (idx !== -1) {
      const item = users[idx].cart.find(c => c.projectionId === projectionId);
      if (item && item.status === 'gledano') {
        item.rating = rating;
        this.saveUsers(users);
      }
    }
  }

  getTotalPrice(getPriceByProjection: (projectionId: number) => number | null): number {
    const active = this.getActiveUser();
    if (!active) return 0;
    return active.cart.reduce((sum, c) => {
      const price = getPriceByProjection(c.projectionId) ?? 0;
      return sum + price * c.count;
    }, 0);
  }
}


