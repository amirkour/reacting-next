import { NextPage } from "next";
import React, { useState, useEffect } from "react";
const whosTurnDefault = "X always goes first :)";

const TicTacToe: NextPage = () => {
  const [whosTurn, setWhosTurn] = useState<string | null>(whosTurnDefault);
  const [board, setBoard] = useState<Array<null | string>>(
    new Array(9).fill(null)
  );
  const [winner, setWinner] = useState<string | null>(null);
  const [lastMoveIndex, setLastMoveIndex] = useState<number | null>(null);

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

  const onBoardClick: (i: number) => Promise<void> = async (i: number) => {
    console.log(`clicked ${i}`);
    if (winner) {
      console.log("There's a winner - nothing to do");
      return;
    }
    if (board[i] != null) {
      console.log(`that space is already taken ... no-op`);
      return;
    }

    console.log(`setting last move index to ${i}`);
    setLastMoveIndex(i);
  };

  const reset = () => {
    setBoard(new Array(9).fill(null));
    setWinner(null);
    setLastMoveIndex(null);
    setWhosTurn(whosTurnDefault);
  };

  useEffect(() => {
    const apiRequest = async () => {
      try {
        const response = await fetch("/api/ttt", {
          method: "POST",
          body: JSON.stringify({ board, move: lastMoveIndex }),
        }).then(async (res) => {
          if (!res.ok) {
            const error = await res.text();
            throw error ?? "Whoops! Something bad happened we know not what!";
          }

          return res.json();
        });
        console.log(`got this response in the ui: ${JSON.stringify(response)}`);

        setBoard(response.board);
        setWhosTurn(response.nextToMove);
        if (response.outcome) setWinner(response.outcome);
      } catch (e) {
        console.log(`got this error: ${e}`);
      }
    };

    if (lastMoveIndex != null) apiRequest();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMoveIndex]);

  return (
    <div className="flex flex-col items-center">
      <h1>Tic Tac Toe!</h1>
      {!winner && (
        <div>
          {whosTurn && whosTurn.length > 0
            ? `${whosTurn}`
            : `${whosTurn}'s turn next!`}
        </div>
      )}
      <ul className="flex flex-row w-[200px] h-[75px] mt-0 my-0 pt-0 py-0">
        {board.slice(0, 3).map((next, i) => (
          <li
            className="flex justify-center items-center w-1/3 h-full border-2 border-black border-solid cursor-pointer"
            onClick={(e) => onBoardClick(i)}
            key={i}
          >
            {next}
          </li>
        ))}
      </ul>
      <ul className="flex flex-row w-[200px] h-[75px] mt-0 my-0 pt-0 py-0">
        {board.slice(3, 6).map((next, i) => (
          <li
            className="flex justify-center items-center w-1/3 h-full border-2 border-black border-solid cursor-pointer"
            onClick={(e) => onBoardClick(i + 3)}
            key={i + 3}
          >
            {next}
          </li>
        ))}
      </ul>
      <ul className="flex flex-row w-[200px] h-[75px] mt-0 my-0 pt-0 py-0">
        {board.slice(6, 9).map((next, i) => (
          <li
            className="flex justify-center items-center w-1/3 h-full border-2 border-black border-solid cursor-pointer"
            onClick={(e) => onBoardClick(i + 6)}
            key={i + 6}
          >
            {next}
          </li>
        ))}
      </ul>
      {winner !== null && (
        <div>
          {winner}
          <br />
          <button onClick={reset}>Reset</button>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
