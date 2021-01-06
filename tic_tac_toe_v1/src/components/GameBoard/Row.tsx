import {FC} from 'react'
import {Square} from "../Square/Square"

type IRow = {
  columnsID:number[]
  setSquares(index:number[]): void
  squares:number[]
  setPlayersTurn(player:number): void
  playersTurn:number
}
const Row: FC<IRow> = ({
  columnsID,
  setSquares,
  squares,
  setPlayersTurn,
  playersTurn
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
      />))}
  </div>
  )
}
export {Row}