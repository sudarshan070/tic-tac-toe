import React from "react";

export default function Square({ value, onClick }) {
  return (
    <div>
      <button className="square shadow-lg rounded" onClick={onClick}>
        {value === null ? "" : value === 1 ? "X" : "O"}
      </button>
    </div>
  );
}
