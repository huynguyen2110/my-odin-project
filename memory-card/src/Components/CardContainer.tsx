
import CardItem from "./CardItem.tsx";
import {Character} from "../types.ts";
import * as React from "react";

interface CardContainerProps {
  characters: Character[];
  chosenCharacters: number[]
  setChosenCharacters: React.Dispatch<React.SetStateAction<number[]>>
}

export default function CardContainer({characters, chosenCharacters, setChosenCharacters}: CardContainerProps){
  return (
    <div className={"card-container"}>
      {characters.map((char) => (
        <CardItem  key={char.id}  character={char} chosenCharacters={chosenCharacters} setChosenCharacters={setChosenCharacters} />
      ))}
    </div>

  )
}