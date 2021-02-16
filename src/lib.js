export function create() {
  return {
    board: {
      cells: Array(9).fill(null)
    },
    xIsNext: true,
    winner: null,
  };
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) return null
  }

  return "D";
}

export function playAt(gameState, idx) {
  if (gameState.winner !== null) return gameState;

  const cells = gameState.board.cells.slice()
  if (cells[idx]) return gameState;

  cells[idx] = gameState.xIsNext ? "X" : "O"

  return {
    board: { cells },
    xIsNext: !gameState.xIsNext,
    winner: calculateWinner(cells),
  }
}
