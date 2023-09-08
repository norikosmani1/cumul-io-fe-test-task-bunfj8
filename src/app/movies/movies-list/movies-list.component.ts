import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FavoriteMovieListItem, MovieListItem } from '../movies.model';
import { MoviesApiService } from '../movies.api-service';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class MoviesListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  movies: MovieListItem[] = [];
  totalElements: number = 0;
  pageIndex: number = 0;
  dataSource = new MatTableDataSource<MovieListItem>();
  searchField: FormControl = new FormControl();

  constructor(
    private moviesApiService: MoviesApiService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.loadPage();
    this.onSearch();
  }

  ngAfterViewInit() {
    const paginatorIntl = this.paginator._intl;
    paginatorIntl.nextPageLabel = '';
    paginatorIntl.previousPageLabel = '';
  }

  onPage(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    if (!this.searchField.value) {
      this.loadPage();
    } else {
      this.searchMovies();
    }
  }

  private loadPage(): void {
    this.moviesApiService
      .getPopularMovies(this.pageIndex + 1)
      .subscribe((data) => {
        this.movies = data.results;
        this.dataSource.data = data.results;
        this.totalElements = data.total_results;
      });
  }

  private searchMovies(): void {
    this.moviesApiService
      .searchMovies(this.searchField.value, this.pageIndex + 1)
      .subscribe((data) => {
        this.movies = data.results;
        this.dataSource.data = data.results;
        this.totalElements = data.total_results;
      });
  }

  private onSearch(): void {
    this.searchField.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((searchValue) => {
        this.pageIndex = 0;
        if (!searchValue) {
          this.loadPage();
        } else {
          this.searchMovies();
        }
      });
  }

  isFavorite(movieId: number): boolean {
    return this.favoritesService.getFavorite(movieId) == null ? false : true;
  }

  toggleFavorite(movie: MovieListItem): void {
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
