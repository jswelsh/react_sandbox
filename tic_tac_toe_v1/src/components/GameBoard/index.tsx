import {useState} from "react"
import {RestartButton} from "./RestartButton"
import {Row} from "./Row"

const columns = {
  first:  [0,1,2],
  second: [3,4,5],
  third:  [6,7,8]
}
export default function GameBoard() {
  const [ squares, setSquares ] = useState<number[]>(Array(9).fill(null))
  const [ playersTurn, setPlayersTurn ] = useState<number>(1)

  const winner = calculateWinner(squares)
  
  const getStatus = () =>(
    winner
    // ? winner === 2 ? 'Pickle Rick! wins, when he feels like it' : 'Ah geez, Looks like Lemon Morty won; man.'
    ? winner === 2 ? 'Pickle Rick wins!' : 'Lemon Morty won!'
    : (isBoardFull(squares))
      ? "Draw!"
      : playersTurn === 1 ? "Lemon Morty's go" : "Pickle Rick's go"
  )
  return (
  <div className="game">
    <div className="game-board">
      {Object.entries(columns).map(([key,columnsID]) => (
        <Row
          columnsID={columnsID}
          setSquares={setSquares}
          squares={squares}
          setPlayersTurn={setPlayersTurn}
          playersTurn={playersTurn}
          winner={winner}
        />
      ))}
    </div>
    <div className="game-info">{getStatus()}</div>
    <div className="restart-button"> <RestartButton setSquares={setSquares} setPlayersTurn={setPlayersTurn}/></div>
  </div>
  )
}

function calculateWinner(squares:number[]) {
  const possibleLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < possibleLines.length; i++) {
    const [a, b, c] = possibleLines[i]
    if (squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function isBoardFull(squares:number[]) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      return false
    }
  }
  return true
}
