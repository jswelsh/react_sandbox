import {FC} from "react"

const RestartButton: FC<IRestartButton> = ({ 
  setPlayersTurn,
  setSquares
}) => {
  
  const onClick = () => {
    setPlayersTurn(1)
    setSquares(Array(9).fill(null))
  }
  return (
    <button 
      className="restart"
      onClick={onClick}>
      Play again
    </button>
  );
}
export {RestartButton}