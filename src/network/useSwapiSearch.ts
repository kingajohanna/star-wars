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
      setData([]);

      try {
        const fetchCharacters = async (url: string) => {
          const response = await fetch(url);
          const result = await response.json();

          setData((prevData) => [...prevData, ...result.results]);

          if (result.next) {
            await fetchCharacters(result.next);
          }
        };

        await fetchCharacters(`${SWAPI_BASE_URL}/people/?search=${query}`);
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
