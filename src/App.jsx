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

function winner(board) {
  const winningCombos = [
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}




function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);

  
  function updateBoard (index){
    if (board[index] !== null || winner(board) !== null ) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    console.log(turn)
    setBoard(newBoard);
    if(winner(newBoard) !== null) {
      console.log(`${winner(newBoard)} wins!`)
      return;
    }
    if (newBoard.every((square) => square !== null)) {
      console.log("It's a tie!");
      return;
    }



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
