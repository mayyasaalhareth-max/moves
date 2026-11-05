import { useEffect, useState } from 'react';

import { getCast } from '@/features/cast/services/cast-api';
import { CastMember } from '@/features/cast/types';

export function useCast() {
  const [cast, setCast] = useState<CastMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getCast()
      .then((data) => {
        if (active) setCast(data);
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

  return { cast, loading, error };
}
