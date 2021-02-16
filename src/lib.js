export function create() {
  return {
    board: {
      cells: Array(9).fill(null)
    },
    xIsNext: true,
    winner: null,
  };
}

class Piece {
  constructor(symbol) {
    this.symbol = symbol
  }
  
  toString() {
    return this.symbol
  }

  equals(other) {
    if (!other) return false;
    
    return other.symbol === this.symbol
  }

  playAt(cells, idx) {
    if (cells[idx] !== null) throw `Cell is already taken!`
    
    cells[idx] = this
  }
}

class OmegaPiece extends Piece {
  playAt(cells, idx) {
    super.playAt(cells, idx)

    // figure out the cell up north, east, west,and south
    // and clear them
    const north = idx - 3
    const south = idx + 3

    // east & west must be on the same row
    const east = (idx - 1) % 3 < idx % 3 ? idx - 1 : -1
    const west = (idx + 1) % 3 > idx % 3 ? idx + 1 : -1

    for (let idx of [north, south, east, west]) {
      // let's only keep those that are inbounds
      if (idx < 0 || idx > 9) continue;

      // we can't delete another Omega piece
      if (this === cells[idx]) continue;
      
      cells[idx] = null;
    }
  }

  // acts as a wildcard
  equals(other) {
    if (other) return true

    return false
  }
}

export const PIECES = {
  X: new Piece('X'),
  O: new Piece('O'),
  OMEGA: new OmegaPiece('Ω'),
}

function piecesEq(a, b) {
  return (a && a.equals(b)) || (b && b.equals(a))
}

export function calculateWinner(squares) {
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
    if (piecesEq(squares[a], squares[b]) &&
        piecesEq(squares[a], squares[c])) {
      return squares[a];
    }
  }

  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) return null
  }

  return "D";
}

export function playAt(gameState, idx, piece) {
  if (gameState.winner !== null) return gameState;

  const cells = gameState.board.cells.slice()
  piece.playAt(cells, idx)

  return {
    board: { cells },
    xIsNext: !gameState.xIsNext,
    winner: calculateWinner(cells),
  }
}
