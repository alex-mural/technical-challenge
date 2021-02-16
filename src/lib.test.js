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

describe('transpose', () => {
  it('transpose a row-major matrix into a col-major', () => {
    const mat = [1, 2, 3, 4]

    expect(game.transpose(mat, 2)).toStrictEqual([1,3,2,4])
  })

  it('prop: the transpose of a transpose is the initial matrix', () => {
    const mat = [1,2,3,4]

    expect(
      game.transpose(
        game.transpose(mat, 2)
      , 2)
    ).toStrictEqual(mat)
  })
})
