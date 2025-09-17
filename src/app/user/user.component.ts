import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { DecimalPipe } from '@angular/common';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { ProjectionService } from '../../services/projection.service';
import { MovieService } from '../../services/movie.service';
import { ReviewsService, ReviewEntry } from '../../services/review.service';

import { UserModel } from '../../models/user.model';
import { CartItemModel } from '../../models/cart-item.model';
import { ProjectionModel } from '../../models/projection.model';

type HistRow = CartItemModel & {
  projection?: ProjectionModel;
  movieTitle: string;
  movieId: number;
  price: number;
  dateTime: string;
  hasReview: boolean;
  existingReview?: ReviewEntry;
};

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    RouterLink, NgIf, NgFor, FormsModule, DatePipe,DecimalPipe,
    MatCardModule, MatButtonModule, MatExpansionModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  user: UserModel | null = null;
  userCopy: UserModel | null = null;

  oldPassword = '';
  newPassword = '';
  repeatPassword = '';

  genres = ['Drama','Comedy','Action','Horror','Sci-Fi','Romance','Animation','Adventure'];

  
  history: HistRow[] = [];

  
  selectedRatingMap: Record<number, number> = {};
  commentMap: Record<number, string> = {};

  displayedHistoryCols: string[] = ['movie','dateTime','price','status','rating','actions'];

  constructor(
    private router: Router,
    private userService: UserService,
    private cartService: CartService,
    private proj: ProjectionService,
    private movies: MovieService,
    private reviews: ReviewsService
  ) {
    const active = this.userService.getActiveUser();
    if (!active) { this.router.navigate(['/login']); return; }
    this.user = active;
    this.userCopy = { ...active };
  }

  ngOnInit() { this.reloadHistory(); }

  private toHistRow(i: CartItemModel): HistRow {
    const p = this.proj.getProjectionById(i.projectionId);
    const movieId = p?.movieId ?? -1;
    const movieTitle = p ? (this.movies.getMovieById(movieId)?.title ?? 'Film') : 'Film';
    const price = p?.price ?? 0;
    const dateTime = p?.dateTime ?? '';

    const email = this.user?.email ?? '';
    const hasReview = !!(email && movieId !== -1 && this.reviews.hasUserReviewed(email, movieId));
    const existingReview = hasReview ? this.reviews.getByUserAndMovie(email, movieId) || undefined : undefined;

    return { ...i, projection: p, movieTitle, movieId, price, dateTime, hasReview, existingReview };
  }

  private reloadHistory() {
    const u = this.userService.getActiveUser(); if (!u) return;
    this.user = u;
    const raw = (u.cart || []).filter(c => c.status !== 'rezervisano');
    this.history = raw.map(i => this.toHistRow(i));
  }

  changePassword() {
    if (!this.oldPassword || !this.newPassword) { alert('Sva polja su obavezna.'); return; }
    if (this.newPassword !== this.repeatPassword) { alert('Lozinke se ne poklapaju.'); return; }
    if (this.oldPassword !== this.user?.password) { alert('Stara lozinka nije tačna.'); return; }
    const ok = this.userService.changePassword(this.newPassword);
    alert(ok ? 'Lozinka je promenjena.' : 'Greška pri promeni.');
    this.oldPassword = this.newPassword = this.repeatPassword = '';
  }

  updateProfile() {
    if (!this.userCopy) return;
    this.userService.updateProfile(this.userCopy);
    this.user = this.userService.getActiveUser();
    alert('Profil ažuriran.');
  }

  
  remove(row: HistRow) {           
    this.cartService.remove(row.id);
    this.reloadHistory();
  }
  cancel(row: HistRow) {            
    this.cartService.cancel(row.id);
    this.reloadHistory();
  }

  
  selectRating(row: HistRow, stars: number) {
    if (row.hasReview) return;
    this.selectedRatingMap[row.id] = stars;
  }

  saveReview(row: HistRow) {
    if (row.status !== 'gledano') { alert('Možete oceniti samo projekcije koje su gledane.'); return; }
    const email = this.user?.email; if (!email) { alert('Niste prijavljeni.'); return; }

    if (this.reviews.hasUserReviewed(email, row.movieId)) {
      alert('Već ste ocenili ovaj film.');
      return;
    }

    const stars = this.selectedRatingMap[row.id];
    if (!stars) { alert('Izaberite ocenu (zvezdice).'); return; }

    const comment = (this.commentMap[row.id] || '').trim() || undefined;
    this.cartService.rate(row.id, stars, comment);

  
    delete this.selectedRatingMap[row.id];
   
    delete this.commentMap[row.id];

    this.reloadHistory();
    alert('Hvala na oceni!');
  }
}

