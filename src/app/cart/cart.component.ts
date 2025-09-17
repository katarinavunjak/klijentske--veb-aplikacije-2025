import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DecimalPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ProjectionService } from '../../services/projection.service';
import { MovieService } from '../../services/movie.service';
import { CartItemModel } from '../../models/cart-item.model';
import { ProjectionModel } from '../../models/projection.model';

type Row = CartItemModel & {
  projection?: ProjectionModel;
  movieTitle: string;
  alternatives: ProjectionModel[];
};

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, MatCardModule, MatTableModule, MatButtonModule, MatSelectModule,DatePipe,DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cols = ['movie', 'projection', 'price', 'status', 'actions'];
  rows: Row[] = [];
  totalReserved = 0;

  constructor(
    private cart: CartService,
    private proj: ProjectionService,
    private movies: MovieService
  ) {}

  ngOnInit() { this.reload(); }

  private mapRow(i: CartItemModel): Row {
    const p = this.proj.getProjectionById(i.projectionId);
    const movieTitle = p ? (this.movies.getMovieById(p.movieId)?.title ?? 'Film') : 'Film';
    const alternatives = p ? this.proj.getProjectionsByMovie(p.movieId) : [];
    return { ...i, projection: p, movieTitle, alternatives };
  }

  private reload() {
    const all = this.cart.getItems();
    this.rows = all.filter(i => i.status === 'rezervisano').map(i => this.mapRow(i));
    this.totalReserved = this.cart.totalReserved();
  }

  changeCount(row: Row, count: number) { this.cart.updateCount(row.id, +count); this.reload(); }
  changeProjection(row: Row, newProjectionId: number) { this.cart.updateProjection(row.id, +newProjectionId); this.reload(); }
  cancel(row: Row) { this.cart.cancel(row.id); this.reload(); }
  markWatched(row: Row) { this.cart.markWatched(row.id); this.reload(); }
}
