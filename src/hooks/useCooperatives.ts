import { useState, useEffect } from 'react';
import type { Cooperative } from '../types';
import { enrichCooperatives } from '../lib/utils/cooperativeUtils';

export function useCooperatives() {
  const [cooperatives, setCooperatives] = useState<Cooperative[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCooperatives() {
      try {
        const response = await fetch('/cooperatives_cote_ivoire.json');
        if (!response.ok) {
          throw new Error('Failed to load cooperatives data');
        }
        const data = await response.json();
        const enriched = enrichCooperatives(data.cooperatives || []);
        setCooperatives(enriched);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    loadCooperatives();
  }, []);

  return { cooperatives, loading, error };
}

