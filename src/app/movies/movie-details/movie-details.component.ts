import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { FavoritesService } from '../favorites.service';
import { MoviesApiService } from '../movies.api-service';
import { FavoriteMovieListItem, Movie } from '../movies.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
})
export class MovieDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private MoviesApiService: MoviesApiService,
    private favoritesService: FavoritesService
  ) {}

  movie: Movie;
  movieId: number;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.movieId = params['id'];
      this.getMovie();
    });
  }

  getMovie(): void {
    this.MoviesApiService.getMovie(this.movieId).subscribe((data: Movie) => {
      this.movie = data;
    });
  }

  getGenres(): string {
    return this.movie.genres.map((genre) => genre.name).join(', ');
  }

  isFavorite(movieId: number): boolean {
    return this.favoritesService.getFavorite(movieId) == null ? false : true;
  }

  toggleFavorite(movie: Movie): void {
    if (!this.isFavorite(movie.id)) {
      const favMovie: FavoriteMovieListItem = {
        id: movie.id,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        title: movie.title,
      };

      this.favoritesService.addFavorite(favMovie);
    } else {
      this.favoritesService.removeFavorite(movie.id);
    }
  }
}
