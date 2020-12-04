import React, { useCallback, useEffect, useState } from "react";
import Square from "../Square";
import AiBoard from "./AiBoard";
import { DRAW, GAME_STATES, PLAYER_O, PLAYER_X } from "./Constant";
import { getRandomInt, switchPlayer } from "./Utils";

const board = new AiBoard();
console.log(board);
const initialSquare = Array(9).fill(null);

export default function TicTacToe() {
  const [squares, setSquares] = useState(initialSquare);
  const [players, setPlayers] = useState({ human: null, ai: null });
  const [gameState, setGameState] = useState(GAME_STATES.notStarted);
  const [nextMove, setNextMove] = useState(null);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const winner = board.getWinner(squares);
    const declareWinner = (winner) => {
      let winnerStr;
      switch (winner) {
        case PLAYER_X:
          winnerStr = "Player X wins!";
          break;
        case PLAYER_O:
          winnerStr = "Player O wins!";
          break;
        case DRAW:
        default:
          winnerStr = "It's a draw";
      }
      setGameState(GAME_STATES.over);
      setWinner(winnerStr);
    };

    if (winner !== null && gameState !== GAME_STATES.over) {
      declareWinner(winner);
    }
  }, [gameState, squares, nextMove]);

  const move = useCallback(
    (index, player) => {
      if (player && gameState === GAME_STATES.inProgress) {
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

  useEffect(() => {
    let timeout;
    if (
      nextMove !== null &&
      nextMove === players.ai &&
      gameState !== GAME_STATES.over
    ) {
      timeout = setTimeout(() => {
        aiMove();
      }, 500);
    }
    return () => timeout && clearTimeout(timeout);
  }, [nextMove, players.ai, aiMove, gameState]);

  const humanMove = (index) => {
    if (!squares[index] && nextMove === players.human) {
      move(index, players.human);
      setNextMove(players.ai);
    }
  };

  const renderSquare = (index) => {
    return <Square value={squares[index]} onClick={() => humanMove(index)} />;
  };

  const chosePlayer = (player) => {
    setPlayers({ human: player, ai: switchPlayer(player) });
    setGameState(GAME_STATES.inProgress);
    setNextMove(PLAYER_X);
  };

  const startNewGame = () => {
    setGameState(GAME_STATES.notStarted);
    setSquares(initialSquare);
  };

  console.log(gameState, "gameState");
  switch (gameState) {
    case GAME_STATES.notStarted:
    default:
      return (
        <div>
          <h2>Chose Your player</h2>
          <div>
            <button onClick={() => chosePlayer(1)}>X</button>
            <button onClick={() => chosePlayer(2)}>O</button>
          </div>
        </div>
      );

    case GAME_STATES.inProgress:
      return (
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
      );

    case GAME_STATES.over:
      return (
        <div>
          <p>{winner}</p>
          <button onClick={startNewGame}> start over </button>
        </div>
      );
  }
}
