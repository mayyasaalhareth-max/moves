import { apiRequest, jsonBody } from '@/services/api-client';
import { CastMember, MovieActor } from '@/features/cast/types';

export const getCast = () => apiRequest<CastMember[]>('/movie-actors');

export const getMovieActors = (id: string) =>
  apiRequest<MovieActor[]>(`/movie-actors/movie/${id}`);

export const addCastMember = (
  actorId: string,
  movieId: string,
  role: string,
) =>
  apiRequest<CastMember>('/movie-actors', {
    method: 'POST',
    ...jsonBody({ actor: actorId, movie: movieId, role }),
  });

export const updateCastMember = (
  id: string,
  actorId: string,
  movieId: string,
  role: string,
) =>
  apiRequest<CastMember>(`/movie-actors/${id}`, {
    method: 'PUT',
    ...jsonBody({ actor: actorId, movie: movieId, role }),
  });

export const removeCastMember = (id: string) =>
  apiRequest<unknown>(`/movie-actors/${id}`, { method: 'DELETE' });
