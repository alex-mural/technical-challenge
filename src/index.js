import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as game from './lib'
import * as ai from './ai';

import './style.css';

function sleep(timeout) {
  return new Promise(r => setTimeout(r, timeout))
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
      <div className="board-row">
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
      <div className="board-row">
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
      <div className="board-row"> 
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
      game: game.create(),
      aiState: AI_STATES.IDLE,
    }
  }

  async aiMove() {
    await sleep(2000)

    const idx = ai.bogo(this.state.game.board.cells)

    this.setState({
      game: game.playAt(this.state.game, idx),
      aiState: AI_STATES.IDLE,
    })
  }

  handleClick(idx) {
    if (this.state.aiState === AI_STATES.THINKING) return;
    
    this.setState({
      game: game.playAt(this.state.game, idx),
      aiState: AI_STATES.THINKING,
    })

    this.aiMove()
  }
  
  handleUndo() {
    // TODO: handle undo
  }

  render() {
    const { board } = this.state.game;

    return (
      <Board
        cells={board.cells}
        onClick={i => this.handleClick(i)}
      />
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

