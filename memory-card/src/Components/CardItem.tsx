import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {Character} from "../types.ts";

export default function CardItem({character}: { character: Character }){
  return (
    <Card sx={{ width: 280, height: 335, bgcolor: "burlywood" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={character.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align={"center"}>
            {character.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}