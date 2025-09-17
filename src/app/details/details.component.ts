import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { ProjectionService } from '../../services/projection.service';
import { CartService } from '../../services/cart.service';
import { ReviewsService, ReviewEntry } from '../../services/review.service';

import { MovieModel } from '../../models/movie.model';
import { ProjectionModel } from '../../models/projection.model';
import { SafePipe } from '../safe.pipe';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgIf, NgFor, MatCardModule, MatButtonModule, SafePipe,DatePipe],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  movie: MovieModel | undefined;
  projections: ProjectionModel[] = [];
  avgRating: number | null = null;
  reviews: ReviewEntry[] = [];

  constructor(
    private route: ActivatedRoute,
    private movies: MovieService,
    private proj: ProjectionService,
    private cart: CartService,
    private rev: ReviewsService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movie = this.movies.getMovieById(id);
    this.projections = this.proj.getProjectionsByMovie(id) || [];
    this.refreshReviews();
  }

  private refreshReviews() {
    if (!this.movie) return;
    this.reviews = this.rev.getByMovie(this.movie.id);
    this.avgRating = this.rev.averageForMovie(this.movie.id);
  }

  reserve(p: ProjectionModel) {
    try {
      this.cart.addReservation(p.id, 1);
      alert('Projekcija je dodata u korpu.');
    } catch (e: any) {
      alert(e?.message || 'Morate biti prijavljeni.');
    }
  }

  
  toEmbed(url?: string | null): string | null {
    if (!url) return null;
    if (url.includes('/embed/')) {
      return url.replace('www.youtube.com', 'www.youtube-nocookie.com');
    }
    const m = url.match(/[?&]v=([^&]+)/);
    const id = m ? m[1] : null;
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : url;
  }
}

