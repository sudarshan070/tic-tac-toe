import React, { useCallback, useEffect, useState } from "react";
import Square from "../Square";
import { getRandomInt, switchPlayer } from "./Utils";

export default function TicTacToe() {
  const initialSquare = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquare);
  const [players, setPlayers] = useState({
    human: null,
    ai: null,
  });
  const [gameState, setGameState] = useState("notStarted");
  const [nextMove, setNextMove] = useState(null);

  const move = useCallback(
    (index, player) => {
      if (player && gameState === "inProgress") {
        setSquares((squares) => {
          const squaresCopy = squares.concat();
          squaresCopy[index] = player;
          return squaresCopy;
        });
      }
    },
    [gameState]
  );

  const aiMove = useCallback(() => {
    let index = getRandomInt(0, 8);
    while (squares[index]) {
      index = getRandomInt(0, 8);
    }
    move(index, players.ai);
    setNextMove(players.human);
  }, [move, squares, players]);

  const humanMove = (index) => {
    if (!squares[index] && nextMove === players.human) {
      move(index, players.human);
      setNextMove(players.ai);
    }
  };

  useEffect(() => {
    let timeout;
    if (nextMove !== null && nextMove === players.ai && gameState !== "over") {
      timeout = setTimeout(() => {
        aiMove();
      }, 500);
    }
    return () => timeout && clearTimeout(timeout);
  }, [nextMove, players.ai, aiMove, gameState]);

  const renderSquare = (index) => {
    return <Square value={squares[index]} onClick={() => humanMove(index)} />;
  };

  const chosePlayer = (player) => {
    setPlayers({ human: player, ai: switchPlayer(player) });
    setGameState("inProgress");
    setNextMove(1);
  };

  return (
    <>
      {gameState === "notStarted" ? (
        <div>
          <h2>Chose Your player</h2>
          <div>
            <button onClick={() => chosePlayer(1)}>X</button>
            <button onClick={() => chosePlayer(2)}>O</button>
          </div>
        </div>
      ) : (
        <div>
          {console.log(squares, "squares")}
          <div className="row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
      )}
    </>
  );
}
