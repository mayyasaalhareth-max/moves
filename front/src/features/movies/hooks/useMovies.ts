import { useEffect, useState } from 'react';

import { getMovies } from '@/features/movies/services/movies-api';
import { Movie } from '@/features/movies/types';

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getMovies()
      .then((data) => {
        if (active) setMovies(data);
      })
      .catch((cause: Error) => {
        if (active) setError(cause.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { movies, loading, error };
}
