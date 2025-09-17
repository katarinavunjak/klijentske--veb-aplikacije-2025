import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MovieService } from '../../services/movie.service';
import { MovieModel } from '../../models/movie.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  movies: MovieModel[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movies = this.movieService.getAllMovies();
  }

  
  onImgError(ev: Event) {
    (ev.target as HTMLImageElement).src = '.assets\fallback.jpg';
  }
}
