import React, { useState } from "react";
import Square from "./Square";

export default function Board() {
  const initialSquare = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquare);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    const newSquares = [...squares];
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  const status = `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div>
      <div>{status}</div>
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
}
