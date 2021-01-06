import {FC} from 'react'
import {Square} from "./Square"

const Row: FC<IRow> = ({
  columnsID,
  setSquares,
  squares,
  setPlayersTurn,
  playersTurn,
  winner
}) => {
  return (
  <div className="board-row">
    {columnsID.map(id => (
      <Square
        id={id}
        setSquares={setSquares}
        squares={squares}
        setPlayersTurn={setPlayersTurn}
        playersTurn={playersTurn}
        winner={winner}
      />))}
  </div>
  )
}
export {Row}