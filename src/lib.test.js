import * as game from './lib'

const todo = _ => {};

describe('sample', () => {
  test('it works', () => {
    expect(true)
  })
});

describe('game', () => {
  describe('.create', () => {
    test('X always play first', () => {
      const state = game.create()

      expect(state.xIsNext).toBeTruthy()
    })
  })

  describe('.playAt', () => {
    test('X plays after O', () => {
      const state = game.create()
      state.xIsNext = false

      expect(game.playAt(state, 0).xIsNext).toBeTruthy()
    })

    test('O plays after X', () => {
      const state = game.create()
      state.xIsNext = true

      expect(game.playAt(state, 0).xIsNext).toBeFalsy()
    })

    test('fails when playing on a non-empty square', todo)
  })

  describe('.calculateWinner', () => {
    test('returns `null` when there are no winners', todo)
    test('returns `DRAW` when the game is draw', todo)
    test('returns `piece` when a piece wins', todo)
  })
})
