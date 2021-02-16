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
  const { cells, size } = props;

  const BoardRow = ({ children }) => (
    <div className="board-row">{children}</div>
  )

  const squares = cells.map((cell, i) => {
    return (
      <Square key={i} value={cell} onClick={e => props.onClick(i, e)} />
    )
  })

  let rows = []
  for (let i = 0; i < cells.length; i += size) {
    rows.push(
      <BoardRow key={i}>{squares.slice(i, i+size)}</BoardRow>
    )
  }
  
  return (
    <div>{rows}</div>
  );
}

const MoveList = (props) => {
  const { moves } = props;

  // pair up the moves nicely
  const movePairs = []
  for (let i = 0; i < moves.length; i+=2) {
    movePairs.push(
      <li key={i}>{moves[i]} {moves[i+1]}</li>
    )
  }

  return (
    <ol>{movePairs}</ol>
  )
}

const AI_STATES = {
  IDLE: 0,
  THINKING: 1,
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: game.create(4),
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
    const { board, moves } = this.state.game;

    return (
      <div>
        <Board
          size={board.size}
          cells={board.cells}
          onClick={(i, evt) => this.handleClick(i, evt) }
        />
        <MoveList moves={moves} />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

