import { useEffect, useState } from 'react';

import { getActors } from '@/features/actors/services/actors-api';
import { Actor } from '@/features/actors/types';

export function useActors() {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getActors()
      .then((data) => {
        if (active) setActors(data);
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

  return { actors, loading, error };
}
