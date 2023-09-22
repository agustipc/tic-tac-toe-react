import confetti from "canvas-confetti"
import { useState } from "react"
import { Square } from "./components/Square"
import { TURNS } from "./constants"
import { checkWinner, checkEndGame } from "./utils"
import { Winner } from "./components/WinnerModal"
import { resetGameStorage, saveGameToStorage } from "./storage"


function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ? turnFromStorage : TURNS.X
  })
  // true if there is a winner and false if there is a tie
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  const updateBoard = (index) => {
    if(board[index] !== null || winner !== null) return

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    setTurn(newTurn)

    // save turn in localstorage
    saveGameToStorage({board: newBoard, turn: newTurn})

    const newWinner = checkWinner(newBoard)
    if(newWinner) {
      confetti()
      setWinner(() => {
        return newWinner
      })
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
    
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard} >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <Winner winner={winner} onClick={resetGame} />
    </main>
  )
}

export default App
