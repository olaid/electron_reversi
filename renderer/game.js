export default class Game {
  constructor(){
    this.player = 1
    this.board = [
      [0,0,0, 0, 0,0,0,0],
      [0,0,0, 0, 0,0,0,0],
      [0,0,0, 0, 0,0,0,0],
      [0,0,0,-1, 1,0,0,0],
      [0,0,0, 1,-1,0,0,0],
      [0,0,0, 0, 0,0,0,0],
      [0,0,0, 0, 0,0,0,0],
      [0,0,0, 0, 0,0,0,0]
    ]
  }
  get enemy(){
    return -this.player
  }
  put(x,y) {
    if( this.canPut(x,y) ){
      this.turnDiscs(x,y)
      this.board[x][y] = this.player
      this.player = -this.player
    }
  }
  disc_count(player){
    let count=0
    //配列全てをサマリして置ける箇所数を出す
    this.board.forEach(x=>x.forEach(y=>y==player?count++:null))
    return count
  }
  turnEnd(){
    //置ける箇所数が0なら
    if( this.canPutChecker().length == 0 ){
      //プレイヤーをPASS
      this.player = -this.player
      //置ける箇所数が0なら
      if( this.canPutChecker().length == 0 ){
        //Geme Over
        return true
      }
    }
    return false
  }
  canPutChecker(){
    let canPutBoard=[]
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
  turnDiscs(x,y) {
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
        if( this.canPutSub( x+di_x, di_x, y+di_y, di_y ) ){
          this.turnDiscsSub( x, di_x, y, di_y )
        }
      }
    }
    return false
  }
  turnDiscsSub( x, di_x, y, di_y ) {
    //自色があればtrueを返す
    if ( this.board[x+di_x][y+di_y] === this.player ) return true
    this.board[x+di_x][y+di_y] = this.player
    //次の石のチェックへ
    return this.turnDiscsSub( x+di_x, di_x, y+di_y, di_y ) 
  }
}