import { fail } from 'jest'
import * as game from './lib'


// **** FIXTURES ****
//

const Board = {
  DRAW: { 
    size: 3,
    cells: [
      'X', 'O', 'X',
      'O', 'X', 'O',
      'O', 'X', 'O',
    ]
  },
  X_WINS: {
    size: 3,
    cells: [
      'X', 'O', 'O',
      'X', null, null,
      'X', null, null,
    ]
  },
  O_WINS: {
    size: 3,
    cells: [
      'O', 'X', 'X',
      'O', null, null,
      'O', null, null,
    ]
  },
}

//
// **** FIXTURES ****

const todo = _ => {};

describe('sample', () => {
  test('it works', () => {
    expect(true)
  })
});

describe('game', () => {
  describe('.create', () => {
    test('X always play first', () => {
      let state = game.create()

      expect(state.xIsNext).toBeTruthy()
    })
  })

  describe('.playAt', () => {
    test('X plays after O', () => {
      let state = game.create()
      state.xIsNext = false
      state = game.playAt(state, 0)

      expect(state.xIsNext).toBeTruthy()
    })

    test('O plays after X', () => {
      let state = game.create()
      state.xIsNext = true
      state = game.playAt(state, 0).xIsNext

      expect(state.xIsNext).toBeFalsy()
    })

    test('fails when playing on a non-empty square', () => {
      // tip: to test for a thrown value, wrap the
      // expectation in a closure:
      //
      // expect(() => thisMightThrow()).toThrow(…)

      // fails this test
      throw todo;
    })
  })

  describe('.calculateWinner', () => {
    test('returns `DRAW` when the game is draw', () => {
      expect(game.calculateWinner(Board.DRAW)).toBe('DRAW')
    })

    test('returns `null` when there are no winners', todo)
    test('returns `piece` when a piece wins', todo)
  })
})
