import { useState } from "react";
import {TURNS} from "./constants";


// eslint-disable-next-line react/prop-types
function Square ({children, index, isSelected, updateBoard}){
  const className = `square ${isSelected ? "is-selected" : ""}`
  function handleClickSquare() {
    
    updateBoard(index)
  }


  return (
    <div className={className} onClick={handleClickSquare} >
      {children}
    </div>
  );
}


function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);

  
  function updateBoard (index){
    const newBoard = [...board];
    newBoard[index] = turn;
    console.log(turn)
    setBoard(newBoard);
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
  }




  return (
    <>
      <main className="board">
        <h1>Tic Tac Toe</h1>
        <section className="game">
          {board.map((square, i) => {
            return (
              <Square
                key={i}
                index={i}
                

                updateBoard={updateBoard}
                >
                {board[i]}
            </Square>
            );
          })}
        </section>
        <section className="turn">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>
      </main>
    </>
  );
}


export default App;
