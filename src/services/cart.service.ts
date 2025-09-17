import { Injectable } from '@angular/core';
import { CartItemModel } from '../models/cart-item.model';
import { UserService } from './user.service';
import { ProjectionService } from './projection.service';
import { ProjectionModel } from '../models/projection.model';
import { ReviewsService } from './review.service'; 

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(
    private userService: UserService,
    private projectionService: ProjectionService,
    private reviews: ReviewsService
  ) {}

  private activeUser() { return this.userService.getActiveUser(); }

  getItems(): CartItemModel[] {
    const u = this.activeUser();
    return u ? JSON.parse(JSON.stringify(u.cart || [])) : [];
  }

  private save(items: CartItemModel[]) {
    const u = this.activeUser(); if (!u) return;
    u.cart = items;
    this.userService.updateProfile(u); 
  }

  private nextId(items: CartItemModel[]) {
    return items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
  }

  addReservation(projectionId: number, count: number = 1) {
    const u = this.activeUser(); if (!u) throw new Error('Niste prijavljeni');
    const p = this.projectionService.getProjectionById(projectionId); if (!p) throw new Error('Projekcija ne postoji');

    const items = this.getItems();
    const it: CartItemModel = {
      id: this.nextId(items),
      projectionId: p.id,
      count: Math.max(1, Math.min(10, count)),
      status: 'rezervisano',
      rating: null
    };
    items.push(it);
    this.save(items);
  }

  totalReserved(): number {
    return this.getItems()
      .filter(i => i.status === 'rezervisano')
      .reduce((sum, i) => {
        const p = this.projectionService.getProjectionById(i.projectionId);
        return sum + ((p?.price || 0) * i.count);
      }, 0);
  }

  updateCount(itemId: number, count: number) {
    const items = this.getItems();
    const it = items.find(i => i.id === itemId);
    if (!it || it.status !== 'rezervisano') return;
    it.count = Math.max(1, Math.min(10, +count));
    this.save(items);
  }

  updateProjection(itemId: number, newProjectionId: number) {
    const items = this.getItems();
    const it = items.find(i => i.id === itemId);
    if (!it || it.status !== 'rezervisano') return;

    const p: ProjectionModel | undefined = this.projectionService.getProjectionById(+newProjectionId);
    if (!p) return;
    it.projectionId = p.id;
    this.save(items);
  }

  cancel(itemId: number) {
    const items = this.getItems();
    const it = items.find(i => i.id === itemId); if (!it) return;
    it.status = 'otkazano';
    this.save(items);
  }

  markWatched(itemId: number) {
    const items = this.getItems();
    const it = items.find(i => i.id === itemId); if (!it) return;
    it.status = 'gledano';
    this.save(items);
  }

  rate(itemId: number, rating: number, comment?: string) {
    const u = this.activeUser(); if (!u) return;
    const items = this.getItems();
    const it = items.find(i => i.id === itemId);
    if (!it || it.status !== 'gledano') return;

    it.rating = Math.max(1, Math.min(5, Math.round(rating)));
    this.save(items);

    const p = this.projectionService.getProjectionById(it.projectionId);
    if (p) this.reviews.upsert(u.email, p.movieId, it.rating!, comment);
  }

  remove(itemId: number) {
    const items = this.getItems();
    const it = items.find(i => i.id === itemId);
    if (!it || it.status !== 'gledano') return;
    this.save(items.filter(i => i.id !== itemId));
  }


  removeFromCart(projectionId: number) {
    const items = this.getItems();
    const it = items.find(i => i.projectionId === projectionId && i.status === 'gledano');
    if (!it) return;
    this.remove(it.id);
  }

  
  changeStatus(
    projectionId: number,
    status: 'rezervisano' | 'gledano' | 'otkazano'
  ) {
    const items = this.getItems();
    const it = items.find(i => i.projectionId === projectionId);
    if (!it) return;

    if (status === 'gledano') this.markWatched(it.id);
    else if (status === 'otkazano') this.cancel(it.id);
    else {
     
      if (it.status !== 'rezervisano') {
        it.status = 'rezervisano';
        this.save(items);
      }
    }
  }

 
  rateProjection(projectionId: number, rating: number) {
    const items = this.getItems();
    const it = items.find(i => i.projectionId === projectionId);
    if (!it) return;
    this.rate(it.id, rating);
  }
}
