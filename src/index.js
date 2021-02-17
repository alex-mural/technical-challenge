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
    <div className="board">{rows}</div>
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
    <ol className="move-list">{movePairs}</ol>
  )
}

const AI_STATES = {
  IDLE: 0,
  THINKING: 1,
}

const Marquise = ({ game }) => {
  const toPlay = game.xIsNext ? PIECES.X : PIECES.O

  return (
    <section className="marquise">
      {game.winner && <p>{game.winner.toString()} wins!</p>}
      {!game.winner && <p>{toPlay.toString()} to play.</p>}
    </section>
  )
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: game.create(3),
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
        <Marquise game={this.state.game} />
        <div className="game-board">
          <Board
            size={board.size}
            cells={board.cells}
            onClick={(i, evt) => this.handleClick(i, evt) }
          />
          <MoveList moves={moves} />
        </div>
      </div>
    );
  }
}

const App = _ => (
  <main>
    <div className="header">
      <h1>Tic-Tac-TΩe</h1>
      <p>
        Take a look at this new tic-tac-toe game, now with 50% more pieces.
      </p>
    </div>
    <Game />
    <footer>Made by <em>insert your name here</em></footer>
  </main>
)

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));
