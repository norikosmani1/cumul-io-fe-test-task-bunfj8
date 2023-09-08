import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FavoritesService } from '../favorites.service';
import { FavoriteMovieListItem } from '../movies.model';

@Component({
  selector: 'app-movies-favorites',
  templateUrl: './movies-favorites.component.html',
  styleUrls: ['./movies-favorites.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule, MatCardModule, MatIconModule],
})
export class MoviesFavoritesComponent implements OnInit {
  constructor(private favoritesService: FavoritesService) {}

  movies: FavoriteMovieListItem[] = [];

  ngOnInit() {
    this.loadPage();
  }

  private loadPage(): void {
    this.movies = this.favoritesService.getFavorites();
  }

  isFavorite(movieId: number): boolean {
    return this.favoritesService.getFavorite(movieId) == null ? false : true;
  }

  toggleFavorite(movie: FavoriteMovieListItem): void {
    !this.isFavorite(movie.id)
      ? this.favoritesService.addFavorite(movie)
      : this.favoritesService.removeFavorite(movie.id);
  }
}
