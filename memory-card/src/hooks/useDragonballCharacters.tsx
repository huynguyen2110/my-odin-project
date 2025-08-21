import {useEffect, useState} from "react";
import {Character, CharactersResponse} from "../types.ts";
import axios from "axios";

export function useDragonballCharacters() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchDragonBallCharacter = async () => {
      try {
        const res = await axios.get<CharactersResponse>('https://dragonball-api.com/api/characters');
        setCharacters(res.data.items);
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    };

    fetchDragonBallCharacter();
  }, [])

  return {characters, loading, error}
}