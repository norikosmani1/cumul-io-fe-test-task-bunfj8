import { Injectable } from '@angular/core';
import { FavoriteMovieListItem } from './movies.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favorites: FavoriteMovieListItem[] = [];

  constructor() {
    this.loadFavorites();
  }

  addFavorite(movie: FavoriteMovieListItem): void {
    if (!this.favorites.find((fav) => fav.id === movie.id)) {
      this.favorites.push(movie);
      this.saveFavorites();
    }
  }

  removeFavorite(movieId: number): void {
    const index = this.favorites.findIndex((movie) => movie.id === movieId);
    if (index !== -1) {
      this.favorites.splice(index, 1);
      this.saveFavorites();
    }
  }

  getFavorites(): FavoriteMovieListItem[] {
    return [...this.favorites];
  }

  getFavorite(movieId: number): FavoriteMovieListItem | null {
    const movie = this.favorites.find((fav) => fav.id === movieId);
    if (!movie) {
      return null;
    } else {
      return movie;
    }
  }

  private loadFavorites(): void {
    const favoritesStr = localStorage.getItem('favorites');
    if (favoritesStr) {
      this.favorites = JSON.parse(favoritesStr);
    }
  }

  private saveFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
