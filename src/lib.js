export function create(size = 3) {
  return {
    board: {
      size,
      cells: Array(size * size).fill(null)
    },
    moves: [],
    xIsNext: true,
    winner: null,
  };
}

// return the Transpose of cells, where rows → cols
//
// this is useful if you need to leverage the symmetry of
// the matrix structure
export function transpose(cells, dimension = 0) {
  return Array.from(
    { length: cells.length },
    (_, i) => {
      const col = i % dimension
      const row = (i - col) / dimension

      // thus we can say that `row * dimension + col = i`
      const tidx = col * dimension + row
      console.log(`${i} → ${tidx}`)
      return cells[tidx]
    }
  )
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

  playAt(board, idx) {
    if (board.cells[idx] !== null) throw `Cell is already taken!`
    
    const cells = board.cells.slice()
    cells[idx] = this

    return cells
  }
}

class OmegaPiece extends Piece {
  playAt(board, idx) {
    const cells = super.playAt(board, idx)
    const sz = board.size

    // figure out the cell up north, east, west,and south
    // and clear them
    const north = idx - sz
    const south = idx + sz

    // east & west must be on the same row
    const east = (idx - 1) % sz < idx % sz ? idx - 1 : -1
    const west = (idx + 1) % sz > idx % sz ? idx + 1 : -1

    for (let idx of [north, south, east, west]) {
      // let's only keep those that are inbounds
      if (idx < 0 || idx > cells.length) continue;

      // we can't delete another Omega piece
      if (this === cells[idx]) continue;
      
      cells[idx] = null;
    }

    return cells
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

export function calculateWinner(board) {
  // the logic is the following:
  // - same symbol on a row
  // - same symbol on a column
  // - same symbol on a diagonal
  //
  // we can use maths for this:
  // idx % size         → col
  // (idx - col) / size → row
  // row == col         → diagonal

  // instead of looking if the symbols are the same
  // let's try to figure out if a symbol wins at all
  const allMatch = piece => (match, cell) => match && piecesEq(piece, cell)
  
  const findRowMatch = (piece, cells, dimension) => {
    for(let i = 0; i < dimension; i++) {
      const row = cells.slice(i, i + dimension)
      const match = row.reduce(allMatch(piece), true)

      if (match) return true
    }

    return false
  }

  const findColMatch = (piece, cells, dimension) => {
    for(let i = 0; i < dimension; i++) {
      const col = Array.from(
        { length : dimension },
        (_, j) => cells[i + j * dimension]
      )
      const match = col.reduce(allMatch(piece), true)

      if (match) return true
    }
  }

  const findDiagMatch = (piece, cells, dimension) => {
    const first = Array.from(
      { length: board.size },
      (_, i) => board.cells[i + i * board.size]
    )

    const second = Array.from(
      { length: board.size },
      (_, i) => board.cells[(board.cells.length-board.size) - (i * board.size) + i]
    )

    return first.reduce(allMatch(piece), true) ||
           second.reduce(allMatch(piece), true)
  }
  
  const winner = [PIECES.X, PIECES.O].find(piece => {
    return findRowMatch(piece, board.cells, board.size) ||
           findColMatch(piece, board.cells, board.size) ||
           findDiagMatch(piece, board.cells, board.size)
  })

  if (winner) return winner
  
  for (let i = 0; i < board.cells.length; i++) {
    if (board.cells[i] === null) return null
  }

  return "DRAW";
}

function moveCode(board, piece, idx) {
  const COLS = Array.from(
    { length: board.size },
    (_, i) => String.fromCharCode(97 + i)
  )
  const ROWS = Array.from(
    { length: board.size },
    (_, i) => (1 + i).toString()
  )
  
  const col = idx % board.size;
  const row = (idx - col) / board.size;

  return `${piece.toString()}${COLS[col]}${ROWS[row]}`
}

export function playAt(gameState, idx, piece) {
  if (gameState.winner !== null) return gameState;

  const mutation = piece.playAt(gameState.board, idx)
  const code = moveCode(gameState.board, piece, idx)

  const board = {
    ...gameState.board,
    cells: mutation
  }

  return {
    board,
    xIsNext: !gameState.xIsNext,
    winner: calculateWinner(board),
    moves: gameState.moves.concat(code),
  }
}
