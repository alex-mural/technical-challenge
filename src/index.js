import React from 'react';
import ReactDOM from 'react-dom';
import * as game from './lib'
import { PIECES } from './lib'
import * as ai from './ai';

import './style.css';


const AUTHOR = '<insert your name here>'

const Square = (props) => {
  const ariaLabel = `${props.value || 'empty'}`

  return (
    <button className="square"
      aria-label={ariaLabel}
      onClick={props.onClick}
      onContextMenu={props.onClick}>
      {props.value}
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

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: game.create(3),
    }
  }

  aiMove() {
    const idx = ai.bogo(this.state.game.board.cells)
    const piece = this.state.game.xIsNext ? PIECES.X : PIECES.O

    this.setState({
      game: game.playAt(this.state.game, idx, piece),
    })
  }

  handleClick(idx, evt) {
    evt.preventDefault();

    let piece = null;
    piece = this.state.game.xIsNext ? PIECES.X : PIECES.O

    this.setState({
      game: game.playAt(this.state.game, idx, piece),
    }, this.aiMove)
  }

  render() {
    const { board } = this.state.game;

    return (
      <div>
        <div className="game-board">
          <Board
            size={board.size}
            cells={board.cells}
            onClick={(i, evt) => this.handleClick(i, evt) }
      />
        </div>
      </div>
    );
  }
}

const App = _ => (
  <Game />
)

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));
