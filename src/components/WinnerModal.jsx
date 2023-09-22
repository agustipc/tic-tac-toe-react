import { PropTypes } from "prop-types"
import { Square } from "./Square"

export const Winner = ({winner, onClick}) => {
  if(winner === null ) return null

  const winnerText = winner === false ? 'TIE' : 'WINNER:'

  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>
        <header>
          {winner && <Square>{winner}</Square>}
        </header>
        <footer>
          <button onClick={onClick}>Play again</button>
        </footer>
      </div>
    </section>     
  )
}

Winner.propTypes = {
  winner: PropTypes.string,
  onClick: PropTypes.func
}

