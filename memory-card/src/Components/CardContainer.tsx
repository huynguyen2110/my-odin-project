
import CardItem from "./CardItem.tsx";
import {Character} from "../types.ts";

interface CardContainerProps {
  characters: Character[];
}

export default function CardContainer({characters}: CardContainerProps){
  return (
    <div className={"card-container"}>
      {characters.map((char) => (
        <CardItem character={char} key={char.id} />
      ))}
    </div>

  )
}