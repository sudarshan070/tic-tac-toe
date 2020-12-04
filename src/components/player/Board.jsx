import React from "react";

export default function Square(props) {
  return (
    <button className="square shadow-lg rounded" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
