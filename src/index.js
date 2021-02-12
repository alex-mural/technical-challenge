import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as ai from './ai';

import './style.css';

///

function calculateWinner(squares) {
  // possible winning combinations for a 3×3 grid
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

const Square = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

const Board = (props) => {
  return (
    <div>
      <div class="board-row">
        <Square
          value={props.cells[0]}
          onClick={() => props.onClick(0)}
        />
        <Square
          value={props.cells[1]}
          onClick={() => props.onClick(1)}
        />
        <Square
          value={props.cells[2]}
          onClick={() => props.onClick(2)}
        />
      </div>
      <div class="board-row">
        <Square
          value={props.cells[3]}
          onClick={() => props.onClick(3)}
        />
        <Square
          value={props.cells[4]}
          onClick={() => props.onClick(4)}
        />
        <Square
          value={props.cells[5]}
          onClick={() => props.onClick(5)}
        />
      </div>
      <div class="board-row"> 
        <Square
          value={props.cells[6]}
          onClick={() => props.onClick(6)}
        />
        <Square
          value={props.cells[7]}
          onClick={() => props.onClick(7)}
        />
        <Square
          value={props.cells[8]}
          onClick={() => props.onClick(8)}
        />
      </div>
    </div>
  );
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: {
        cells: Array(9).fill(null)
      },
      xIsNext: true
    };
  }

  handleClick(i) {
    const { board } = this.state;
    let cells = board.cells.slice();

    // TODO: handle error message
    if (cells[i]) return;
    cells[i] = this.state.xIsNext ? "X" : "O";

    const aiMove = ai.bogo(cells)
    cells[aiMove] = !this.state.xIsNext ? "X" : "O";

    this.setState({
      board: { cells },
      xIsNext: !this.state.xIsNext
    });
  }

  handleUndo() {
    // TODO: handle undo
  }

  render() {
    const { board } = this.state;
    const winner = calculateWinner(board.cells);

    console.log(board)
    let status = winner
               ? "Winner: " + winner
               : "Next player: " + (this.state.xIsNext ? "X" : "O");

    return (
      <div>
        <div>
          <Board
            cells={board.cells}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div>
          <div>{status}</div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

