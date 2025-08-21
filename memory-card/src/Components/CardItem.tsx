import {Character} from "../types.ts";

export default function CardItem({character}: { character: Character }){
  return (
    <div className={"card-item"}>
      <img src={character.image} alt={character.name} />
      <div className={"character-name"}>
        <p>{character.name}</p>
      </div>
    </div>
  )
}