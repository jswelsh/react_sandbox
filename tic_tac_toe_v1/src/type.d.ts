type IRow = {
  columnsID:number[]
  setSquares(index:number[]): void
  squares:number[]
  setPlayersTurn(player:number): void
  playersTurn:number
  winner:number|null
}

type IRestartButton = {
  setPlayersTurn(player:number): void
  setSquares(index:number[]): void
}

type ISquare = {
  id:number
  setSquares(index:number[]):void
  squares:number[]
  setPlayersTurn(player:number): void
  playersTurn:number
  winner:number|null
}