export default class ai {
  let valuationBoard = [
    [9,3,2,5,5,2,3,9],
    [3,1,4,6,6,4,1,3],
    [2,4,4,8,8,4,4,2],
    [5,6,8,5,5,8,6,5],
    [5,6,8,5,5,8,6,5],
    [2,4,4,8,8,4,4,2],
    [3,1,4,6,6,4,1,3],
    [9,3,2,5,5,2,3,9]
  ]
  const depthMax = 3

  randomSelect(){
    canPutBoard=canPutChecker()
    canPutBoard[Math.floor(Math.random()*canPutBoard.length-1)]
  }

  getPutPosition(board,player){
    this.board = board
    this.cpu = player
    this.enemy = -player
    return deepThinkAllAB(0, 0)
  }

  deepThink(x,y) {
    for( let x = 0; x <= 7; x++ ){
      for( let y = 0; y <= 7; y++ ){
        deepThink(map, turn, depth, b, a)
      }
    }
  }
  canPutChecker(){
    let canPutBoard
    for( let x = 0; x <= 7; x++ ){
      for( let y = 0; y <= 7; y++ ){
        if(this.canPut(x,y)==1)canPutBoard.push([x,y])
      }
    }
    return canPutBoard
  }
  canPut(x,y) {
    if( this.board[x][y] != 0 ) return false
    for( let di_x = -1 ; di_x <= 1 ; di_x++ ){
      for( let di_y = -1 ; di_y <= 1 ; di_y++ ){
        //中心以外の８方向をチェックする
        if ( di_x === 0 && di_y === 0 ) continue
        //盤外の場合は次へ
        if ( x+di_x < 0 || y+di_y < 0 || 7 < x+di_x || 7 < y+di_y ) continue
        //接してる石が相手色でなければ次へ
        if ( this.board[x+di_x][y+di_y] != this.enemy ) continue
        //再帰チェック
        if( this.canPutSub( x+di_x, di_x, y+di_y, di_y ) ) return true
      }
    }
    return false
  }
  canPutSub(x,di_x,y,di_y) {
    //盤外の場合はfalseを返しこの方向のチェックを終わる
    if ( x+di_x < 0 || y+di_y < 0 || 7 < x+di_x || 7 < y+di_y ) return false
    //石がない場合はfalseを返しこの方向のチェックを終わる
    if ( this.board[x+di_x][y+di_y] === 0 ) return false
    //自色があればtrueを返す
    if ( this.board[x+di_x][y+di_y] === this.player ) return true
    //次の石のチェックへ
    return this.canPutSub( x+di_x, di_x, y+di_y, di_y ) 
  }
}