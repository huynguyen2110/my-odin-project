import './App.css'
import {CircularProgress} from "@mui/material";
import CardContainer from "./Components/CardContainer.tsx";
import InfoContainer from "./Components/InfoContainer.tsx";
import {useDragonballCharacters} from "./hooks/useDragonballCharacters.tsx";
import {useState, useEffect, useMemo} from "react";

function App() {
  const {characters, loading, error} = useDragonballCharacters()
  const [chosenCharacters, setChosenCharacters] = useState<number[]>([])
  const [maxScore, setMaxScore] = useState(0)

  function shuffleArray<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  useEffect(() => {
    if (chosenCharacters.length > maxScore) {
      setMaxScore(chosenCharacters.length);
    }
  }, [chosenCharacters, maxScore]);

  const randomCharacters = useMemo(
    () => {
       return shuffleArray(characters)
    },
    [characters, chosenCharacters]
  );

  if (loading) return <div className="loading"><CircularProgress /></div>;
  if (error) return <div className="error"><p>Error: {error.message}</p></div>;

  return (
    <div className="app-container">
      <InfoContainer chosenCharacters={chosenCharacters} maxScore={maxScore} />
      <CardContainer characters={randomCharacters} chosenCharacters={chosenCharacters} setChosenCharacters={setChosenCharacters}/>
    </div>
  )
}

export default App
