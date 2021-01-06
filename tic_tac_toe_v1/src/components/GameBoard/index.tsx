import { useState } from "react"
import {Row} from "./Row"
const columns = {
  first: [0,1,2],
  second: [3,4,5],
  third: [6,7,8]
}
/* Array(9).fill(0,0,0,0,0,0,0,0,0) *//* <number[]> */
export default function GameBoard() {
  const [ squares, setSquares ] = useState<number[]>(Array(9).fill(null))
  const [ playersTurn, setPlayersTurn ] = useState<number>(1)

  const winner = calculateWinner(squares)
  
  function getStatus() {
    if (winner) {
      return "Winner: " + winner;
    } else if (isBoardFull(squares)) {
      return "Draw!";
    } else {
      return "Next player: " + (playersTurn === 1 ? 1 : 2);
    }
  }
  return (
  <div className="game-board">
    {Object.entries(columns).map(([key,columnsID]) => (
      <Row
        columnsID={columnsID}
        setSquares={setSquares}
        squares={squares}
        setPlayersTurn={setPlayersTurn}
        playersTurn={playersTurn}
      />
    ))}
    <div className="game-info">{getStatus()}</div>
  </div>
  )
}
