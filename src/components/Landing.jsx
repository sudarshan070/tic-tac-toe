import React from "react";
import TicTacToe from "./ai/Tic-Tac-Toe";
import Game from "./player/Game";

export default function Landing() {
  return (
    <div>
      <Game />
      <TicTacToe />
    </div>
  );
}
