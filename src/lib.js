function sleep(timeout) {
  return new Promise(r => setTimeout(r, timeout));
}

/**
 * @typedef {string} BoardCell
 *
 * @typedef BoardState
 * @property {number} size
 * @property {BoardCell[]} cells
 */

/**
 * @typedef GameState
 * @property {BoardState} board
 * @property {boolean} xIsNext
 * @property {WinnerResult} winner
 */

/**
 * Factory function that creates the initial GameState.
 *
 * @param {number} size the board size; i.e. `3` would yield a 3x3 grid.
 * @returns {GameState}
 */
export function create(size = 3) {
  return {
    board: {
      size,
      cells: Array(size * size).fill(null)
    },
    xIsNext: true,
    winner: null
  };
}

/**
 * @typedef {'X'|'O'} Piece
 * @type {Map<Piece, Piece>}
 */
export const PIECES = {
  X: "X",
  O: "O"
};

/**
 * @param {Piece} a
 * @param {Piece} b
 */
function piecesEq(a, b) {
  return (a && a == b) || (b && b == a);
}

/**
 * Determines if there is a current winner.
 *
 * @typedef {Piece | null | 'DRAW'} WinnerResult
 * @param {BoardState} board
 * @returns {WinnerResult}
 */
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
  const allMatch = piece => (match, cell) => match && piecesEq(piece, cell);

  const findRowMatch = piece => {
    const { size: dimension, cells } = board;

    for (let i = 0; i < dimension; i++) {
      const row = cells.slice(i, i + dimension);
      const match = row.reduce(allMatch(piece), true);

      if (match) return true;
    }

    return false;
  };

  const findColMatch = piece => {
    const { size: dimension, cells } = board;

    for (let i = 0; i < dimension; i++) {
      const col = Array.from(
        { length: dimension },
        (_, j) => cells[i + j * dimension]
      );
      const match = col.reduce(allMatch(piece), true);

      if (match) return true;
    }
  };

  const findDiagMatch = piece => {
    const { size: dimension, cells } = board;

    const first = Array.from(
      { length: dimension },
      (_, i) => cells[i + i * dimension]
    );

    const second = Array.from(
      { length: dimension },
      (_, i) => cells[cells.length - dimension - i * dimension + i]
    );

    return (
      first.reduce(allMatch(piece), true) ||
      second.reduce(allMatch(piece), true)
    );
  };

  const winner = [PIECES.X, PIECES.O].find(piece => {
    return findRowMatch(piece) || findColMatch(piece) || findDiagMatch(piece);
  });

  if (winner) return winner;

  for (let i = 0; i < board.cells.length; i++) {
    if (board.cells[i] === null) return null;
  }

  return "DRAW";
}

/**
 *
 * @param {GameState} gameState
 * @param {number} idx index of the cell to play into, must be empty
 * @param {Piece} piece the piece to play
 * @throws {string}
 * @returns {GameState} gameState mutation
 */
export function playAt(gameState, idx, piece) {
  if (gameState.winner !== null) return gameState;

  let cells = gameState.board.cells.slice();

  if (cells[idx]) throw "Cannot play on a non-empty square.";
  cells[idx] = piece;

  const board = {
    ...gameState.board,
    cells
  };

  return {
    board,
    xIsNext: !gameState.xIsNext,
    winner: calculateWinner(board)
  };
}
