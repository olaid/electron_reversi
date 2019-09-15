import Ai from '../renderer/ai' ;

describe('Ai', function () {
  describe('getPutPosition', () => {
    it('初手', () => {
      const player = 1
      const board = [
        [0,0,0, 0, 0,0,0,0],
        [0,0,0, 0, 0,0,0,0],
        [0,0,0, 0, 0,0,0,0],
        [0,0,0,-1, 1,0,0,0],
        [0,0,0, 1,-1,0,0,0],
        [0,0,0, 0, 0,0,0,0],
        [0,0,0, 0, 0,0,0,0],
        [0,0,0, 0, 0,0,0,0]
      ]
      console.log( Ai.getPutedBoard( board, player, 5, 4 ).map(x=>x.map(y=>y==-1?2:y).join(',')) )
    })
    it('石を返す', () => {
      const player = -1
      const board = [
        [0,0,0, 0, 0,0,0,0],
        [0,0,0, 0,-1,0,0,0],
        [0,0,0, 0, 1,0,0,0],
        [0,0,0,-1, 1,0,0,0],
        [0,0,0, 1, 1,0,0,0],
        [0,0,0, 0, 1,0,0,0],
        [0,0,0, 0, 0,0,0,0],
        [0,0,0, 0, 0,0,0,0]
      ]
      console.log( Ai.getPutedBoard( board, player, 6, 4 ).map(x=>x.map(y=>y==-1?2:y).join(',')) )
      console.log( Ai.getPutedBoard( board, player, 6, 4 ).map(x=>x.reduce((val,val2)=>val+val2)).reduce((val,val2)=>val+val2) ) 
    })
  })

  describe('getCanPutPositions', () => {
    it('初手', () => {
      const player = 1
      const board = [
        [0,0,0, 0, 0,0,0,0],
        [0,0,0, 0, 0,0,0,0],
        [0,0,0, 0, 0,0,0,0],
        [0,0,0,-1, 1,0,0,0],
        [0,0,0, 1,-1,0,0,0],
        [0,0,0, 0, 0,0,0,0],
        [0,0,0, 0, 0,0,0,0],
        [0,0,0, 0, 0,0,0,0]
      ]
      console.log( Ai.getCanPutPositions( board, player ).map(x=>x.map(y=>y==-1?2:y).join(',')) )
    })
    it('石を返す', () => {
      const player = -1
      const board = [
        [0,0,0, 0, 0,0,0,0],
        [0,0,0, 0,-1,0,0,0],
        [0,0,0, 0, 1,0,0,0],
        [0,0,0,-1, 1,0,0,0],
        [0,0,0, 1, 1,0,0,0],
        [0,0,0, 0, 1,0,0,0],
        [0,0,0, 0, 0,0,0,0],
        [0,0,0, 0, 0,0,0,0]
      ]
      console.log( Ai.getCanPutPositions( board, player ).map(x=>x.map(y=>y==-1?2:y).join(',')) )
    })
  })

  describe('deepThink', () => {
    it('初手', () => {
      const player = 1
      const board = [
        [0,0,0, 0, 0,0,0,0],
        [0,0,0, 0, 0,0,0,0],
        [0,0,0, 0, 0,0,0,0],
        [0,0,0,-1, 1,0,0,0],
        [0,0,0, 1,-1,0,0,0],
        [0,0,0, 0, 0,0,0,0],
        [0,0,0, 0, 0,0,0,0],
        [0,0,0, 0, 0,0,0,0]
      ]
      console.log( Ai.deepThink( board, player ) )
    })
    it('中盤', () => {
      const player = -1
      const board = [
        [0,0,0, 0, 0,0,0,0],
        [0,0,0, 0,-1,0,0,0],
        [0,0,0, 0, 1,0,0,0],
        [0,0,0,-1, 1,0,0,0],
        [0,0,0, 1, 1,0,0,0],
        [0,0,0, 0, 1,0,0,0],
        [0,0,0, 0, 0,0,0,0],
        [0,0,0, 0, 0,0,0,0]
      ]
      console.log( Ai.deepThink( board, player ) )
    })
  })
})