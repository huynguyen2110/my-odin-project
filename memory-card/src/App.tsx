import './App.css'
import {CircularProgress} from "@mui/material";
import CardContainer from "./Components/CardContainer.tsx";
import InfoContainer from "./Components/InfoContainer.tsx";
import {useDragonballCharacters} from "./hooks/useDragonballCharacters.tsx";

function App() {
  const {characters, loading, error} = useDragonballCharacters()
  if (loading) return <div className="loading"><CircularProgress /></div>;
  if (error) return <div className="error"><p>Error: {error.message}</p></div>;

  console.log('characters', characters)

  return (
    <div className="app-container">
      <InfoContainer />
      <CardContainer characters={characters}/>
    </div>
  )
}

export default App
