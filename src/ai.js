function rand(from, to) {
  const range = 1 + to - from;
  
  return Math.floor(
    Math.random() * range
  ) + from
}

export function bogo(cells) {
  // find all the empty cells indices
  let freeCellsIdx = []
  for (var i = 0; i < cells.length; i++) {
    if (cells[i] !== null) continue;
    
    freeCellsIdx.push(i)
  }
  
  const freeIdx = rand(0, freeCellsIdx.length - 1)
  return freeCellsIdx[freeIdx]
}


