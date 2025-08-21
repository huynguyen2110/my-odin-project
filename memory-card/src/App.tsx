import './App.css'
import {Container, CircularProgress} from "@mui/material";
import CardContainer from "./Components/CardContainer.tsx";
import InfoContainer from "./Components/InfoContainer.tsx";
import {useDragonballCharacters} from "./hooks/useDragonballCharacters.tsx";

function App() {
  const {characters, loading, error} = useDragonballCharacters()
  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  console.log('characters', characters)

  return (
    <>
      <Container maxWidth="xl" sx={{ height: '100vh' }}>
        <InfoContainer ></InfoContainer>
        <CardContainer characters={characters}/>
      </Container>
    </>
  )
}

export default App
