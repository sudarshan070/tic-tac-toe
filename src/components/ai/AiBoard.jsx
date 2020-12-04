import Board from "../Board";
import { DRAW } from "./Constant";
import { minmax } from "./minmax";

export default class AiBoard {
  constructor(squares) {
    this.squares = squares || Array(9).fill(null);
  }

  makeMove = (square, player) => {
    if (this.squares[square] === null) {
      this.squares[square] = player;
    }
  };

  getEmptySquare = (squares = this.squares) => {
    let allSquares = [];
    squares.forEach((square, i) => {
      if (square === null) allSquares.push();
    });
    return allSquares;
  };

  isEmpty = (squares = this.squares) => {
    return this.getEmptySquare(squares).length === 9;
  };

  getWinner = (squares = this.squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let res = null;
    lines.forEach((e, i) => {
      if (
        squares[e[0]] !== null &&
        squares[e[0]] === squares[e[1]] &&
        squares[e[0]] === squares[e[2]]
      ) {
        res = squares[e[0]];
      } else if (res === null && this.getEmptySquare(squares).length === 0) {
        res = DRAW;
      }
    });
    return res;
  };
  clone = () => {
    return new Board(this.squares.concat());
  };
}
