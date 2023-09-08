import 'zone.js/dist/zone';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { MoviesListComponent } from './app/movies/movies-list/movies-list.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MovieDetailsComponent } from './app/movies/movie-details/movie-details.component';
import { MoviesFavoritesComponent } from './app/movies/movies-favorites/movies-favorites.component';

const routes: Routes = [
  {
    path: 'movie-details/:id',
    component: MovieDetailsComponent,
  },
  {
    path: 'favorite-movies',
    component: MoviesFavoritesComponent,
  },
  {
    path: '',
    component: MoviesListComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideRouter(routes), provideAnimations()],
});
