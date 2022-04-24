import React, { useState, useEffect } from "react";

const TicTacToe = () => {
  const [move, setMove] = useState<number>(0);
  const [board, setBoard] = useState<Array<null | string>>(
    new Array(9).fill(null)
  );
  const [winner, setWinner] = useState<string | null>(null);

  const rowWin: (row: number) => boolean = (row: number) => {
    return (
      row >= 0 &&
      row < board.length &&
      row % 3 === 0 &&
      board[row] !== null &&
      board[row] === board[row + 1] &&
      board[row] === board[row + 2]
    );
  };

  const colWin: (col: number) => boolean = (col: number) => {
    return (
      col >= 0 &&
      col < 3 &&
      board[col] !== null &&
      board[col] === board[col + 3] &&
      board[col] === board[col + 6]
    );
  };

  const diagonalWinIndex: () => number | null = () => {
    if (board[0] !== null && board[0] === board[4] && board[4] === board[8])
      return 0;
    if (board[2] !== null && board[2] === board[4] && board[4] === board[6])
      return 2;
    return null;
  };

  const getWinner: () => string | null = () => {
    if (move < 3) return null;

    const winIndex = diagonalWinIndex();
    if (winIndex !== null) return board[winIndex];

    for (let i = 0; i < 3; i++) {
      if (rowWin(i * 3)) return board[i * 3];
      if (colWin(i)) return board[i];
    }

    if (move >= 9) return "Nobody";

    return null;
  };

  const onBoardClick: (i: number) => void = (i: number) => {
    console.log(`clicked ${i}`);
    if (winner) {
      console.log("There's a winner - nothing to do");
      return;
    }

    if (board[i]) {
      console.log(`${i} has already been clicked, try again`);
      return;
    }

    const newBoard = board.slice();
    if (move % 2 === 0) {
      // x moves
      newBoard[i] = "X";
    } else {
      // o moves
      newBoard[i] = "O";
    }

    setMove((prev) => prev + 1);
    setBoard(newBoard);
  };

  const reset = () => {
    setMove(0);
    setBoard(new Array(9).fill(null));
    setWinner(null);
  };

  useEffect(() => {
    const currentWinner = getWinner();
    console.log(`Winner is ${currentWinner}`);
    if (currentWinner !== null) setWinner(currentWinner);
  }, [move]);

  return (
    <>
      <div className="container">
        <h1>Tic Tac Toe!</h1>
        <div>{move % 2 === 0 ? "X to move" : "O to move"}</div>
        <ul>
          {board.slice(0, 3).map((next, i) => (
            <li onClick={(e) => onBoardClick(i)} key={i}>
              {next}
            </li>
          ))}
        </ul>
        <ul>
          {board.slice(3, 6).map((next, i) => (
            <li onClick={(e) => onBoardClick(i + 3)} key={i + 3}>
              {next}
            </li>
          ))}
        </ul>
        <ul>
          {board.slice(6, 9).map((next, i) => (
            <li onClick={(e) => onBoardClick(i + 6)} key={i + 6}>
              {next}
            </li>
          ))}
        </ul>
        {winner !== null && (
          <div>
            {winner} wins!
            <br />
            <button onClick={reset}>Reset</button>
          </div>
        )}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        ul {
          list-style: none;
          padding: 0 0;
          margin: 0 0;
          display: flex;
          flex-direction: row;
        }
        li {
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 0;
          padding: 0 0;
          width: 40px;
          height: 40px;
          border: 2px solid black;
        }
      `}</style>
    </>
  );
};

export default TicTacToe;
