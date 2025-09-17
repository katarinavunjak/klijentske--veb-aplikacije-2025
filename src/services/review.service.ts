import { Injectable } from '@angular/core';

export interface ReviewEntry {
  userEmail: string;
  movieId: number;
  rating: number;        
  comment?: string;
  createdAt: string;     
}

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  private key = 'reviews_v1';
  private data: ReviewEntry[] = [];

  constructor() {
    const raw = localStorage.getItem(this.key);
    this.data = raw ? JSON.parse(raw) : [];
  }

  private save() {
    localStorage.setItem(this.key, JSON.stringify(this.data));
  }

  getByMovie(movieId: number): ReviewEntry[] {
    return this.data.filter(r => r.movieId === movieId);
  }

  getByUserAndMovie(userEmail: string, movieId: number): ReviewEntry | undefined {
    return this.data.find(r => r.userEmail === userEmail && r.movieId === movieId);
  }

  hasUserReviewed(userEmail: string, movieId: number): boolean {
    return !!this.getByUserAndMovie(userEmail, movieId);
  }

  averageForMovie(movieId: number): number | null {
    const list = this.getByMovie(movieId);
    if (!list.length) return null;
    const sum = list.reduce((s, r) => s + r.rating, 0);
    return Math.round((sum / list.length) * 10) / 10; 
  }

  
  upsert(userEmail: string, movieId: number, rating: number, comment?: string): 'created' | 'updated' {
    rating = Math.max(1, Math.min(5, Math.round(rating)));
    const existing = this.getByUserAndMovie(userEmail, movieId);
    if (existing) {
      existing.rating = rating;
      existing.comment = comment ?? existing.comment;
      existing.createdAt = new Date().toISOString();
      this.save();
      return 'updated';
    }
    this.data.push({
      userEmail, movieId, rating, comment,
      createdAt: new Date().toISOString()
    });
    this.save();
    return 'created';
  }
}
