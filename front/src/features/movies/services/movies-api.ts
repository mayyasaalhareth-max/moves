import { apiRequest, jsonBody } from '@/services/api-client';
import { Movie, MovieFormData } from '@/features/movies/types';

export const getMovies = () => apiRequest<Movie[]>('/movies');

export const saveMovie = (id: string, movie: MovieFormData) =>
  apiRequest<Movie>(id ? `/movies/${id}` : '/movies', {
    method: id ? 'PUT' : 'POST',
    ...jsonBody({ ...movie, rating: Number(movie.rating) }),
  });

export const removeMovie = (id: string) =>
  apiRequest<unknown>(`/movies/${id}`, { method: 'DELETE' });

export const getMovie = (id: string) =>
  apiRequest<Movie>(`/movies/${id}`);
