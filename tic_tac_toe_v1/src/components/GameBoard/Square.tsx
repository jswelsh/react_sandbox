import {FC} from "react"

const Square: FC<ISquare> = ({
  id,
  setSquares,
  squares,
  setPlayersTurn,
  playersTurn,
  winner
}) => {
  const onClick = () => {
    if(squares[id] !== null || winner !== null) {
      return null
    }
    const nextSquares = [...squares]
    nextSquares[id] = playersTurn
    setSquares(nextSquares)
    setPlayersTurn(playersTurn === 1 ? 2 : 1)
  }
  return (
  <button
    className='square'
    key={id}
    onClick={onClick}>
    {squares[id]}
  </button>
  )
}
export {Square} 