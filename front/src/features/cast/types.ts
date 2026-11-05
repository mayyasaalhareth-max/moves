import { Actor } from '@/features/actors/types';
import { Movie } from '@/features/movies/types';

export type CastMember = {
  _id: string;
  actor: Pick<Actor, '_id' | 'name'> | null;
  movie: Pick<Movie, '_id' | 'title'> | null;
  role: string;
};

export type MovieActor = {
  _id: string;
  actor: Pick<Actor, '_id' | 'name'> | null;
  role: string;
};
