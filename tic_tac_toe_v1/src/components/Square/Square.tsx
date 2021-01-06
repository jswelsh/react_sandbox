import {FC} from "react"

type ISquare = {
  id:number
  setSquares(index:number[]):void
  squares:number[]
  setPlayersTurn(player:number): void
  playersTurn:number
}
const Square: FC<ISquare> = ({
  setSquares,
  squares,
  setPlayersTurn,
  playersTurn,
  id
}) => {
  return (
  <button
    className='square'
    key={id}
    onClick={()=> {
      const nextSquares = [...squares]
      nextSquares[id]= playersTurn
      setSquares(nextSquares)
      setPlayersTurn(playersTurn === 1 ? 2 : 1)
    }
    }>
    {squares[id]}
  </button>
  )
}
export {Square} 