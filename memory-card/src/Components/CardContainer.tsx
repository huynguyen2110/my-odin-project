
import CardItem from "./CardItem.tsx";
import {Character} from "../types.ts";
import {Grid} from "@mui/material";

interface CardContainerProps {
  characters: Character[];
}

export default function CardContainer({characters}: CardContainerProps){
  return (
    <Grid container spacing={2}>
      {characters.map((char) => (
        <Grid item xs={12} sm={6} md={4} lg={2.4} key={char.id}>
          <CardItem character={char} />
        </Grid>
      ))}
    </Grid>

  )
}