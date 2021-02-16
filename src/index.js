import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as ai from './ai';

import './style.css';

function sleep(timeout) {
  return new Promise(r => setTimeout(r, timeout))
}

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

const AI_STATES = {
  IDLE: 0,
  THINKING: 1,
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: {
        cells: Array(9).fill(null)
      },
      xIsNext: true,
      winner: null,
      aiState: AI_STATES.IDLE
    };
  }

  async aiMove() {
    this.setState({ aiState: AI_STATES.THINKING })

    await sleep(2000)

    const idx = ai.bogo(this.state.board.cells)
    this.playAt(idx)

    this.setState({
      aiState: AI_STATES.IDLE,
    })
  }

  // implement this?
  playAt(idx) {
    if (this.state.winner !== null) return;

    let cells = this.state.board.cells.slice();
    if (cells[idx]) return;

    cells[idx] = this.state.xIsNext ? "X" : "O";

    const winner = calculateWinner(cells);

    this.setState({
      board: { cells },
      xIsNext: !this.state.xIsNext,
      winner,
    })
  }

  handleClick(idx) {
    if (this.state.aiState === AI_STATES.THINKING) return;

    this.playAt(idx)
    this.aiMove()
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

