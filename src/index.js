import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as game from './lib'
import { PIECES } from './lib'
import * as ai from './ai';

import './style.css';

function sleep(timeout) {
  return new Promise(r => setTimeout(r, timeout))
}

const Square = (props) => {
  return (
    <button className="square"
      onClick={props.onClick}
      onContextMenu={props.onClick}>
      {props.value && props.value.toString()}
    </button>
  );
};

const Board = (props) => {
  return (
    <div>
      <div className="board-row">
        <Square
          value={props.cells[0]}
          onClick={e => props.onClick(0, e)}
        />
        <Square
          value={props.cells[1]}
          onClick={e => props.onClick(1, e)}
        />
        <Square
          value={props.cells[2]}
          onClick={e => props.onClick(2, e)}
        />
      </div>
      <div className="board-row">
        <Square
          value={props.cells[3]}
          onClick={e => props.onClick(3, e)}
        />
        <Square
          value={props.cells[4]}
          onClick={e => props.onClick(4, e)}
        />
        <Square
          value={props.cells[5]}
          onClick={e => props.onClick(5, e)}
        />
      </div>
      <div className="board-row"> 
        <Square
          value={props.cells[6]}
          onClick={e => props.onClick(6, e)}
        />
        <Square
          value={props.cells[7]}
          onClick={e => props.onClick(7, e)}
        />
        <Square
          value={props.cells[8]}
          onClick={e => props.onClick(8, e)}
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
    const piece = this.state.game.xIsNext ? PIECES.X : PIECES.O

    this.setState({
      game: game.playAt(this.state.game, idx, piece),
      aiState: AI_STATES.IDLE,
    })
  }

  handleClick(idx, evt) {
    evt.preventDefault();

    if (this.state.aiState === AI_STATES.THINKING) return;

    let piece = null;
    switch(evt.button) {
      case 0:
        piece = this.state.game.xIsNext ? PIECES.X : PIECES.O
        break;
      case 2:
        piece = PIECES.OMEGA
        break
    }
    
    this.setState({
      game: game.playAt(this.state.game, idx, piece),
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
        onClick={(i, evt) => this.handleClick(i, evt) }
      />
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

