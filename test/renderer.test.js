import Game from '../renderer/game' ;

describe('Game', function () {
  describe('put 石置き関数', () => {
    it('再帰関数テスト', () => {
      const game = new Game()
      expect(game.canPutSub(3,0,3,1)).toBeTruthy()
      expect(game.canPutSub(4,0,1,-1)).toBeFalsy()
      expect(game.canPutSub(5,1,2,0)).toBeFalsy()
      expect(game.canPutSub(3,-1,2,0)).toBeFalsy()

      expect(game.canPutSub(5,1,3,1)).toBeFalsy()
      expect(game.canPutSub(5,1,1,-1)).toBeFalsy()
      expect(game.canPutSub(3,-1,3,1)).toBeFalsy()
      expect(game.canPutSub(3,-1,1,-1)).toBeFalsy()
    })
    it.skip('canPut関数テスト', () => {
      const game = new Game()
      for( let x = 0; x <= 7; x++ ){
        for( let y = 0; y <= 7; y++ ){
          console.log( 'x:' + x + ' y:' + y + ' put?:' + game.canPut(x,y))
        }
      }
    })
    it('異色を挟んで反対側に同色がある場合石が置け、ターンが切り替わる', () => {
      const game = new Game()
      game.put(2,3)
      expect(game.board[2][3]).toBe(1)
      expect(game.board[3][3]).toBe(1)
      game.put(4,2)
      expect(game.board[4][2]).toBe(-1)
      expect(game.board[4][3]).toBe(-1)
    })
    it('置いてあるマスには石は置けずターンが変わらない', () => {
      const game = new Game()
      const def_player = game.player
      game.put(3,3)
      expect(def_player).toBe(game.player)
      game.put(3,4)
      expect(def_player).toBe(game.player)
      game.put(4,3)
      expect(def_player).toBe(game.player)
      game.put(4,4)
      expect(def_player).toBe(game.player)
    })
    it('異色が触れてない場所には置けない', () => {
      const game = new Game()
      const def_player = game.player
      game.put(0,0)
      expect(def_player).toBe(game.player)
      game.put(0,7)
      expect(def_player).toBe(game.player)
      game.put(7,0)
      expect(def_player).toBe(game.player)
      game.put(7,7)
      expect(def_player).toBe(game.player)
    })
  })
  describe('constructor()', () => {
    it('初期状態で中央に石が置かれている', () => {
      const game = new Game()
      expect(game.board[3][3]).toBe(-1)
      expect(game.board[4][4]).toBe(-1)
      expect(game.board[3][4]).toBe(1)
      expect(game.board[4][3]).toBe(1)
    })
  })

  describe('pass', () => {
    it('最速PASS手順', () => {
      const game = new Game()
      game.put(4,5)
      game.turnEnd()
      game.put(5,5)
      game.turnEnd()
      game.put(2,3)
      game.turnEnd()
      game.put(4,6)
      game.turnEnd()
      game.put(4,7)
      game.turnEnd()
      game.put(3,7)
      game.turnEnd()
      game.put(6,5)
      const def_player = game.player
      game.put(5,7)
      game.turnEnd()
      console.log(game.board.map(x=>x.map(y=>y==-1?2:y).join('') ) )
      //PASSされて同じプレイヤーに戻ること
      expect(def_player).toBe(game.player)
    })
    it('チェックXチェック' ,() => {
      const game = new Game()
      console.log(game.canPutChecker())
      expect(game.canPutChecker()).toStrictEqual(
        [
          [2,3],
          [3,2],
          [4,5],
          [5,4]
        ]
      )
      game.put(4,5)
      expect(game.canPutChecker()).toStrictEqual(
        [
          [3,5],
          [5,3],
          [5,5]
        ]
      )
      //console.log(game.canPutChecker().map(x=>x.map(y=>y==true?1:0).join(',') ) )
    })
    it('白全滅' ,() => {
      const game = new Game()
      game.put(4,5)
      game.put(5,3)
      game.put(4,2)
      game.put(3,5)
      game.put(2,4)
      game.put(5,5)
      game.put(4,6)
      game.put(5,4)
      game.put(6,4)
      //白が全滅していることを確認
      expect(game.disc_count(-1)).toBe(0)
      //試合が終了するとturnEndがTrueを返す予定
      expect(game.turnEnd()).toBeTruthy()
    })
    it('黒全滅' ,() => {
      const game = new Game()
      game.put(4,5)
      game.put(5,5)
      game.put(5,4)
      game.put(3,5)
      game.put(2,4)
      game.put(1,3)
      game.put(2,3)
      game.put(5,3)
      game.put(3,2)
      game.put(3,1)
      //黒が全滅していることを確認
      expect(game.disc_count(1)).toBe(0)
      //試合が終了するとturnEndがTrueを返す予定
      expect(game.turnEnd()).toBeTruthy()
    })
  })

})