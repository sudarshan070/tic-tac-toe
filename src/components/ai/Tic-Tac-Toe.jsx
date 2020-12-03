import React, { useState } from "react";
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

  const move = (index, player) => {
    setSquares((squares) => {
      const squaresCopy = squares.concat();
      squaresCopy[index] = player;
      return squaresCopy;
    });
  };

  const aiMove = () => {
    let index = getRandomInt(0, 8);
    while (squares[index]) {
      index = getRandomInt(0, 8);
    }
    move(index, players.ai);
  };

  const humanMove = (index) => {
    if (!squares[index]) {
      move(index, players.human);
      aiMove();
    }
  };

  const renderSquare = (index) => {
    return <Square value={squares[index]} onClick={() => humanMove(index)} />;
  };

  const chosePlayer = (player) => {
    setPlayers({ human: player, ai: switchPlayer(player) });
    setGameState("inProgress");
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
