interface InfoContainerProps {
  chosenCharacters: number[]
  maxScore: number
}

export default function InfoContainer({chosenCharacters, maxScore}: InfoContainerProps) {
  return (
    <div className={"header"}>
      <div className={"title"}>
        <h2>Memory Game</h2>
        <p>Get points by clicking on an image but don't click on any more than once!</p>
      </div>
      <div className={"score-board"}>
        <p className={"score"}>Score: {chosenCharacters.length}</p>
        <p className={"best-score"}>Best score: {maxScore}</p>
      </div>
    </div>
  )
}