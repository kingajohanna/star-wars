import { useState, useEffect } from 'react';
import { Character } from '../types/SwapiCharacter';
import { SWAPI_BASE_URL } from '../constants/api';

export const useSwapiSearch = (query: string) => {
  const [data, setData] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchCharacters = async (url: string): Promise<Character[]> => {
          const response = await fetch(url);
          const result = await response.json();
          return result.results.concat(result.next ? await fetchCharacters(result.next) : []);
        };

        const characters = await fetchCharacters(`${SWAPI_BASE_URL}/people/?search=${query}`);
        setData(characters);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return { data, loading, error };
};
