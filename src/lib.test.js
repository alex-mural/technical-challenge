import * as game from './lib'

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
  })
})
