import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { isDev } from "../lib/config";
const whosTurnDefault = "❌ always goes first 🥳";

const TicTacToe: NextPage = () => {
  const [whosTurn, setWhosTurn] = useState<string | null>(whosTurnDefault);
  const [board, setBoard] = useState<Array<null | string>>(
    new Array(9).fill(null)
  );
  const [winner, setWinner] = useState<string | null>(null);
  const [lastMoveIndex, setLastMoveIndex] = useState<number | null>(null);
  const [rawResponse, setRawResponse] = useState<any>(null);
  const [boardHistory, setBoardHistory] = useState<(null | string)[][]>([]);

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
    setRawResponse(null);
    setBoardHistory([]);
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
        setRawResponse(response);

        setBoard(response.board);
        setWhosTurn(`${response.nextToMove}'s turn next`);
        setBoardHistory((old) => [...boardHistory, response.board]);
        if (response.outcome) setWinner(response.outcome);
      } catch (e) {
        console.log(`got this error: ${e}`);
      }
    };

    if (lastMoveIndex != null) apiRequest();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMoveIndex]);

  const setBoardState = (newBoardState: (string | null)[]) => {
    setBoard(newBoardState);
    setBoardHistory([newBoardState]);
  };

  return (
    <div className="flex flex-col items-center">
      <h1>Tic Tac Toe!</h1>
      {!winner && (
        <div className="my-4">
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
      {isDev() && (
        <div className="text-red-400 border-solid border-red-400 border-8 w-full text-center p-1 mt-4">
          <h2>dev mode enabled</h2>
          {rawResponse && (
            <>
              <h3>response</h3>
              <ul>
                {Object.keys(rawResponse).map((key) => (
                  <li key={key}>
                    {key}: {JSON.stringify(rawResponse[key])}
                  </li>
                ))}
              </ul>
            </>
          )}
          {boardHistory && (
            <>
              <h3 className="mt-4">board history</h3>
              <ul>
                {boardHistory.map((bh, i) => (
                  <li key={i}>
                    {JSON.stringify(bh)}
                    <button onClick={() => setBoardState(bh)}>set</button>
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="mt-4">
            <button onClick={reset}>Reset</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
