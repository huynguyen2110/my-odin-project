
export default function InfoContainer() {
  return (
    <div className={"header"}>
      <div className={"title"}>
        <h2>Memory Game</h2>
        <p>Get points by clicking on an image but don't click on any more than once!</p>
      </div>
      <div className={"score-board"}>
        <p className={"score"}>Score: 0</p>
        <p className={"best-score"}>Best score: 6</p>
      </div>
    </div>
  )
}