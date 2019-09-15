
const valuationBoard = [
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

export default class ai {
  static getPutPosition( board, player ){
    return this.randomSelect( board, player )
  }
  //ランダム置き
  static randomSelect( board, player ){
    let canPutPositions = this.getCanPutPositions( board, player )
    //canput配列からランダムに取り出し返す
    return canPutPositions[Math.floor(Math.random() * (canPutPositions.length-1) ) ]
  }
  //石をおいた後の盤を返却
  static getPutedBoard( board, player, x, y ){
    let putedBoard = board
    let enemy = -player
    putedBoard[x][y] = player
    for( let di_x = -1 ; di_x <= 1 ; di_x++ ){
      for( let di_y = -1 ; di_y <= 1 ; di_y++ ){
        //中心以外の８方向をチェックする
        if ( di_x === 0 && di_y === 0 ) continue
        //盤外の場合は次へ
        if ( x+di_x < 0 || y+di_y < 0 || 7 < x+di_x || 7 < y+di_y ) continue
        //接してる石が相手色でなければ次へ
        if ( putedBoard[x+di_x][y+di_y] != enemy ) continue
        //再帰チェック
        if( this.canPutSub( board, player, x+di_x, di_x, y+di_y, di_y ) ){
          putedBoard = this.getPutedBoardSub( putedBoard, player, x, di_x, y, di_y )
        }
      }
    }
    return putedBoard
  }
  //石を返す
  static getPutedBoardSub( board, player, x, di_x, y, di_y ) {
    //自色があればboardを返す
    if ( board[x+di_x][y+di_y] === player ) return board
    board[x+di_x][y+di_y] = player
    //次の石のチェックへ
    return this.getPutedBoardSub( board, player, x+di_x, di_x, y+di_y, di_y ) 
  }
  //思考
  static deepThink( board, player, depth=0 ) {
    let best_position
    let score
    let best_score = 0
    //最下層で点数の集計を行う
    if(depth > depthMax) {
      return [board.map(
        (col,index_x) => col.reduce(
          ( prev, current, index_y )=> prev + (current * valuationBoard[index_x][index_y])
        )
      ).reduce(
        ( prev, current )=> prev + current
      ),null]
    }
    this.getCanPutPositions( board, player ).forEach(
      position =>{
        let putedBoard
        putedBoard = this.getPutedBoard( board, player, ...position )
          
        //playerは読みが深くなる毎に変わる
        score = this.deepThink( putedBoard, -player, ++depth )[0] | 0;

        //相手番(深さが奇数)の時は最小値を取る
        if( depth % 2 === 0 && score > best_score || best_score === 0 ){
          best_score = score
          best_position = position
        }else if( depth % 2 === 1 && score < best_score ){
          best_score = score
          best_position = position
        }

      } 
    )
    return [best_score,best_position]
  }
  //
  static getCanPutPositions( board, player ){
    let canPutPositions = []
    for( let x = 0; x <= 7; x++ ){
      for( let y = 0; y <= 7; y++ ){
        if(this.canPut( board, player, x, y )==1)canPutPositions.push([x,y])
      }
    }
    return canPutPositions
  }
  static canPut( board, player, x, y ) {
    let enemy = -player
    if( board[x][y] != 0 ) return false
    for( let di_x = -1 ; di_x <= 1 ; di_x++ ){
      for( let di_y = -1 ; di_y <= 1 ; di_y++ ){
        //中心以外の８方向をチェックする
        if ( di_x === 0 && di_y === 0 ) continue
        //盤外の場合は次へ
        if ( x+di_x < 0 || y+di_y < 0 || 7 < x+di_x || 7 < y+di_y ) continue
        //接してる石が相手色でなければ次へ
        if ( board[x+di_x][y+di_y] != enemy ) continue
        //再帰チェック
        if( this.canPutSub( board, player, x+di_x, di_x, y+di_y, di_y ) ) return true
      }
    }
    return false
  }
  static canPutSub( board, player, x, di_x, y, di_y ) {
    //盤外の場合はfalseを返しこの方向のチェックを終わる
    if ( x+di_x < 0 || y+di_y < 0 || 7 < x+di_x || 7 < y+di_y ) return false
    //石がない場合はfalseを返しこの方向のチェックを終わる
    if ( board[x+di_x][y+di_y] === 0 ) return false
    //自色があればtrueを返す
    if ( board[x+di_x][y+di_y] === player ) return true
    //次の石のチェックへ
    return this.canPutSub( board, player, x+di_x, di_x, y+di_y, di_y ) 
  }
}