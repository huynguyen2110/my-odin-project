import {Character} from "../types.ts";
import * as React from "react";
interface CardItemProps {
  character: Character;
  chosenCharacters: number[]
  setChosenCharacters: React.Dispatch<React.SetStateAction<number[]>>
}


export default function CardItem({character, chosenCharacters, setChosenCharacters}: CardItemProps){

  const handleClickCardCharacter = () => {
    if(chosenCharacters.includes(character.id)) {
      setChosenCharacters([])
    } else {
      setChosenCharacters([...chosenCharacters, character.id])
    }
  }

  return (
    <div className={"card-item"} onClick={handleClickCardCharacter}>
      <img src={character.image} alt={character.name} />
      <div className={"character-name"}>
        <p>{character.name}</p>
      </div>
    </div>
  )
}