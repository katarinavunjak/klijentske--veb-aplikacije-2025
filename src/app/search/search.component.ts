
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { MovieService } from '../../services/movie.service';
import { ProjectionService } from '../../services/projection.service';
import { MovieModel } from '../../models/movie.model';
import { ProjectionModel } from '../../models/projection.model';

type Row = {
  movie: MovieModel;
  minPrice: number | null;
  nearestProjection: string | null;
};

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule, NgFor, RouterLink,
    MatCardModule, MatFormFieldModule, MatInputModule,DatePipe,
    MatSelectModule, MatButtonModule, MatTableModule
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  
  title = '';
  description = '';
  selectedGenre = '';
  selectedDirector = '';
  selectedActors: string[] = [];
  selectedReleaseDate = '';     
  selectedProjectionDate = '';  
  sortPrice: '' | 'asc' | 'desc' = '';

  
  genres: string[] = [];
  directors: string[] = [];
  actors: string[] = [];
  releaseDates: string[] = [];
  projectionDates: string[] = [];

  
  private movies: MovieModel[] = [];
  private projections: ProjectionModel[] = [];
  private projByMovie = new Map<number, ProjectionModel[]>();

  
  displayedColumns = ['title', 'genre', 'director', 'actors', 'release', 'nearest', 'minPrice', 'actions'];
  rows: Row[] = [];

  constructor(
    private movieService: MovieService,
    private projectionService: ProjectionService
  ) {}

  ngOnInit() { this.bootstrap(); }

  
  private bootstrap() {
    
    const movies = this.movieService.getAllMovies();
    this.movies = movies || [];

    
    const projs = this.projectionService.getAllProjections?.() || [];
    this.projections = projs;

    
    this.projByMovie.clear();
    for (const p of this.projections) {
      const arr = this.projByMovie.get(p.movieId) ?? [];
      arr.push(p);
      this.projByMovie.set(p.movieId, arr);
    }
    for (const [k, arr] of this.projByMovie) {
      arr.sort((a, b) => a.dateTime.localeCompare(b.dateTime));
      this.projByMovie.set(k, arr);
    }

    
    this.recomputeOptions();
    this.buildRows();
  }

  
  private parseGenres(g: string): string[] {
    return (g || '').split(',').map(s => s.trim()).filter(Boolean);
  }
  private unique<T>(arr: T[]): T[] { return Array.from(new Set(arr)).filter(Boolean) as T[]; }


  private getMoviesFiltered(exclude: Partial<Record<'genre'|'director'|'actors'|'releaseDate'|'projectionDate', boolean>> = {}) {
    const qTitle = this.title.trim().toLowerCase();
    const qDesc = this.description.trim().toLowerCase();

    return this.movies.filter(m => {
      if (qTitle && !m.title.toLowerCase().includes(qTitle)) return false;
      if (qDesc && !m.description.toLowerCase().includes(qDesc)) return false;

      if (!exclude.genre && this.selectedGenre) {
        const tokens = this.parseGenres(m.genre);
        if (!tokens.includes(this.selectedGenre)) return false;
      }

      if (!exclude.director && this.selectedDirector) {
        if (m.director !== this.selectedDirector) return false;
      }

      if (!exclude.actors && this.selectedActors.length) {
        const set = new Set(m.actors || []);
        if (!this.selectedActors.some(a => set.has(a))) return false;
      }

      if (!exclude.releaseDate && this.selectedReleaseDate) {
        if (m.releaseDate !== this.selectedReleaseDate) return false;
      }

      if (!exclude.projectionDate && this.selectedProjectionDate) {
        const projs = this.projByMovie.get(m.id) || [];
        if (!projs.some(p => p.dateTime.startsWith(this.selectedProjectionDate))) return false;
      }

      return true;
    });
  }

 
  private recomputeOptions() {
    
    const forGenres = this.getMoviesFiltered({ genre: true });
    this.genres = this.unique(forGenres.flatMap(m => this.parseGenres(m.genre))).sort();

    const forDirectors = this.getMoviesFiltered({ director: true });
    this.directors = this.unique(forDirectors.map(m => m.director)).sort();

   
    const forActors = this.getMoviesFiltered({ actors: true });
    this.actors = this.unique(forActors.flatMap(m => m.actors || [])).sort();

    const forRelDates = this.getMoviesFiltered({ releaseDate: true });
    this.releaseDates = this.unique(forRelDates.map(m => m.releaseDate)).sort();

    
    const forProjDates = this.getMoviesFiltered({ projectionDate: true });
    const dates: string[] = [];
    for (const m of forProjDates) {
      const arr = this.projByMovie.get(m.id) || [];
      arr.forEach(p => dates.push(p.dateTime.substring(0, 10)));
    }
    this.projectionDates = this.unique(dates).sort();

    if (this.selectedGenre && !this.genres.includes(this.selectedGenre)) this.selectedGenre = '';
    if (this.selectedDirector && !this.directors.includes(this.selectedDirector)) this.selectedDirector = '';
    if (this.selectedReleaseDate && !this.releaseDates.includes(this.selectedReleaseDate)) this.selectedReleaseDate = '';
    if (this.selectedProjectionDate && !this.projectionDates.includes(this.selectedProjectionDate)) this.selectedProjectionDate = '';
    if (this.selectedActors.length) {
      this.selectedActors = this.selectedActors.filter(a => this.actors.includes(a));
    }
  }

  private buildRows() {
    const movies = this.getMoviesFiltered(); 
    const rows: Row[] = movies.map(movie => {
      const all = this.projByMovie.get(movie.id) || [];
      const projs = this.selectedProjectionDate
        ? all.filter(p => p.dateTime.startsWith(this.selectedProjectionDate))
        : all;

      let minPrice: number | null = null;
      let nearest: string | null = null;
      if (projs.length) {
        minPrice = projs.reduce((acc, p) => (acc === null || p.price < acc ? p.price : acc), null as number | null);
        nearest = projs[0]?.dateTime ?? null; 
      }

      return { movie, minPrice, nearestProjection: nearest };
    });

    if (this.sortPrice === 'asc') rows.sort((a, b) => (a.minPrice ?? Infinity) - (b.minPrice ?? Infinity));
    if (this.sortPrice === 'desc') rows.sort((a, b) => (b.minPrice ?? -Infinity) - (a.minPrice ?? -Infinity));

    this.rows = rows;
  }

 
  onFilterChange() {
    this.recomputeOptions();
    this.buildRows();
  }

  reset() {
    this.title = '';
    this.description = '';
    this.selectedGenre = '';
    this.selectedDirector = '';
    this.selectedActors = [];
    this.selectedReleaseDate = '';
    this.selectedProjectionDate = '';
    this.sortPrice = '';
    this.recomputeOptions();
    this.buildRows();
  }
}
