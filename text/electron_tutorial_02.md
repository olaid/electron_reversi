# Electronを使ってオセロアプリを作る
## 設計 
前章では設計を行わず大雑把に環境構築を行いましたが 
ここで大まかな仕様を決めます。 
オセロで登場するオブジェクトはゲーム盤、石、試合ルール、プレイヤーと言ったところでしょうか？ 
ゲーム盤は8x8のマス目があり２人のプレイヤーが石を交互に置き合い試合をします。 
それぞれのオブジェクトがさらに詳細に仕様をつめていきます。 

## 初期状態 
まずは仕様をまとめ、Jestのテストを書きます。 
黒石を1、白石を-1、置かれていない場所は0とすることにします。 
オセロはゲーム開始時点で中央四つに石が置かれています。 
これをテストにすると下のようになります。 
boardは8x8なので[3,3][4,4][3,4][4,3]が最初が石を置く位置です。 
### ./test/reversi.test.js 
```
import Game from '../renderer/game’ ; 
describe('Game', function () {     
    : 
  describe('constructor()', () => {
    it('初期状態で中央に石が置かれている', () => {
      const game = new Game()
      expect(game.board[3][3]).toBe(-1)
      expect(game.board[4][4]).toBe(-1)
      expect(game.board[3][4]).toBe(1)
      expect(game.board[4][3]).toBe(1)
    })
  })
}) 
```
boardを定義していませんので勿論エラーになるはずです。 
次にこれを実装します。また盤の状態を取得できるようにゲッターも作成します。 
### ./renderer/board.js 
```
export default class Board { 
  constructor(){ 
    this.player = 1; 
    this.board = [ 
      [0,0,0,0,0,0,0,0], 
      [0,0,0,0,0,0,0,0], 
      [0,0,0,0,0,0,0,0], 
      [0,0,0,-1,1,0,0,0], 
      [0,0,0,1,-1,0,0,0], 
      [0,0,0,0,0,0,0,0], 
      [0,0,0,0,0,0,0,0], 
      [0,0,0,0,0,0,0,0] 
    ]; 
  } 
  put(x,y) 
    this.player = -this.player; 
   
} 
```
ひとまずデータの初期状態ができました。 

## 表示 
初期状態ができましたのでこれを表示してみましょう。 
表示部分は仕様変更が容易になるように自動テストは簡易にしておくのが望ましいです。 
ここではテストを省略して後ほど行うようにします。 

描画用にhtmlにcanvasを設置します。 
### html 
```
<body> 
    <canvas id="canv" width="500px" height="500px"></canvas> 
    <script src="./reversi.js" ></script> 
</body> 
```

javascriptを作成します。 
getContextで画面上の描画領域canvから2D描画のための情報を取得します。 
### reversi.js 
```
import Game from '../renderer/game' ; 
import Draw from '../renderer/draw' 
var context = document.getElementById("canv").getContext('2d'); 
var game = new Game() 
var draw = new Draw(context) 
draw.draw_discs(board.board) 
```
描写のメインはdraw_boardとdraw_discsです。 
canvasに対して四角と円でオセロ盤を表示しています。 
```
const COLOR_LINE = "#FFFFFF"; 
const COLOR_BOARD = "#00BB33"; 
const COLOR_WHITE = "#FFFFFF"; 
const COLOR_BLACK = "#000000"; 
const CELL_SIZE = 60; 
const DISC_SIZE = 29; 
export default class Drawing { 
  constructor(context){ 
    this.context = context 
    this.draw_board() 
  } 
  draw_board(){ 
    this.context.beginPath() 
    this.context.clearRect(0,0,500,500); 
    this.context.lineWidth = 1; 
    this.context.fillStyle = COLOR_BOARD; 
    for (var x = 0; x < 8; x++) { 
        for (var y = 0; y < 8; y++) { 
            this.context.strokeStyle = COLOR_LINE; 
            this.context.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE); 
            this.context.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE); 
        } 
    } 
  } 
  draw_discs(board){ 
    this.board = board 
    for (var x = 0; x < 8; x++) { 
        for (var y = 0; y < 8; y++) { 
          this.context.beginPath() 
          if (this.board[x][y] == 1 ) { 
            this.context.fillStyle = COLOR_BLACK; 
            this.context.arc( 
              x * CELL_SIZE + CELL_SIZE/2, 
              y * CELL_SIZE + CELL_SIZE/2, 
              DISC_SIZE, 
              0, 
              Math.PI*2, 
              false 
            ); 
            this.context.fill(); 
          } 
          else if (this.board[x][y] == -1 ) { 
            this.context.fillStyle = COLOR_WHITE; 
            this.context.arc( 
              x * CELL_SIZE + CELL_SIZE/2, 
              y * CELL_SIZE + CELL_SIZE/2, 
              DISC_SIZE , 
              0, 
              Math.PI*2, 
              false 
            ); 
            this.context.fill(); 
          } 
        } 
    } 
  } 
} 
```

## 石を置く 
put関数にオセロルールを実装していきます。 
まずはテストに仕様を記述しましょう。 
### ./test/reversi.test.js 
```
  describe('put 石置き関数', () => { 
    it('異色を挟んで反対側に同色がある場合石が置け、ターンが切り替わる', () => {
      const game = new Game()
      game.put(2,3)
      expect(game.board[2][3]).toBe(1)
      game.put(4,2)
      expect(game.board[4][2]).toBe(-1)
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
```
毎回mainのテストが実行される必要はないためスキップするようにしましょう 
### ./test/main.test.js 
```
describe.skip('Window', function () { 
```
実行時にskipedが１になりました。 
また石置き関数がfailになりました。 

## 実装 
実装を進めていきます。 以下の実装には間違いがあります。
jestもfailのままです。
テストや出力を使って間違いを特定してみましょう。
```
  put(x,y) { 
    if( this.canPut(x,y) ){ 
      this.board[x][y] = this.player 
      this.player = -this.player 
    } 
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
        if ( this.board[x+di_x][y+di_y] === -this.player ) continue 
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
```
一番最下層の再帰関数からチェックしてみます。 
```
    it.only('再帰関数テスト', () => { 
      const board = new Board() 
      expect(game.canPutSub(3,0,3,1)).toBeTruthy()
      expect(game.canPutSub(4,0,1,-1)).toBeFalsy()
      expect(game.canPutSub(5,1,2,0)).toBeFalsy()
      expect(game.canPutSub(3,-1,2,0)).toBeFalsy()

      expect(game.canPutSub(5,1,3,1)).toBeFalsy()
      expect(game.canPutSub(5,1,1,-1)).toBeFalsy()
      expect(game.canPutSub(3,-1,3,1)).toBeFalsy()
      expect(game.canPutSub(3,-1,1,-1)).toBeFalsy()
    }) 
```
総当たりでcanPut関数を実行してみます。 
再帰関数のテストは削除するかonlyを外しましょう 
```
    it.only('canPut関数テスト', () => { 
      const game = new Game() 
      for( let x = 0; x <= 7; x++ ){ 
        for( let y = 0; y <= 7; y++ ){ 
          console.log( 'x:' + x + ' y:' + y + ' put?:' + game.canPut(x,y)) 
        } 
      } 
    }) 
```
trueの個数が多いです。 
本来であれば4-2,2-4,5-3,3-5の四つのみが置けるはずです。 
1,１に対して全方向の再帰関数を実行してみましょう。 
```
    it('再帰関数テスト', () => { 
      const game = new Game() 
      console.log(board.canPutSub(1,0,2,1)) 
      console.log(board.canPutSub(1,0,0,-1)) 
      console.log(board.canPutSub(2,1,1,0)) 
      console.log(board.canPutSub(0,-1,1,0)) 
      console.log(board.canPutSub(2,1,2,1)) 
      console.log(board.canPutSub(2,1,0,-1)) 
      console.log(board.canPutSub(0,-1,2,1)) 
      console.log(board.canPutSub(0,-1,0,-1)) 
    }) 
```
斜めだけTrueになっているようです。 
ということはどこかで+-を間違っている？ 

見つけました。相手色でなければという表現が悪かったのかもしれません。 
```
        //接してる石が相手色でなければ次へ 
        if ( this.board[x+di_x][y+di_y] === -this.player ) 
continue
``` 
ここは分かりやすくゲッターを定義してみましょう 
```
  get enemy(){ 
    return -this.player 
  } 
        //接してる石が相手色でなければ次へ 
        if ( this.board[x+di_x][y+di_y] != this.enemy ) continue 
```
少し分かりやすくなったのではないでしょうか？ 
ログを表示していた部分はskipに設定し他のテストを実行します。 
5passedでエラーはなくなるになるはずです。 

## 石を裏返す 
次は石を裏返す処理を実装します。 
テストは2行追加しましょう 
```
    it('異色を挟んで反対側に同色がある場合石が置け、ターンが切り替わる', () => { 
      const board = new Board() 
      board.put(4,2) 
      expect(board.board[4][2]).toBe(1) 
      expect(board.board[4][3]).toBe(1) 
      board.put(5,4) 
      expect(board.board[5][4]).toBe(-1) 
      expect(board.board[5][4]).toBe(-1) 
    }) 
```
実装は このようになります。
```
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
```
テストは通りましたが配列の中身がどのようになっているのか気になります。次の文で表示してみましょう。
```
      console.log(board.board.map(x=>x.map(y=>y==-1?2:y).join('') ) )
```

mapは配列内部全てに処理をする関数です。二重にして二次元配列全てに処理をしています。
さらにアロー演算子と三項演算子を併用して-1を2に置き換えることで出力時のマス目ずれないようにしています。
joinは配列を一つにすることで無駄な改行が入らないようにしています。

## マウス処理
オセロのルールは一部実装されましたがまだクリックしても石が置けません。マウス処理を追加しましょう。
addEventListenerでマウスをクリックし離した時点で処理を実行されるようにします。
### renderer/reversi.js
```
import Game from '../renderer/game' ;
import Draw from '../renderer/draw'
var context = document.getElementById("canv").getContext('2d');

context.canvas.addEventListener('mouseup', ev_mouseClick)
var game = new Game()
var draw = new Draw(context)
draw.draw_discs(game.board)

function ev_mouseClick(e) {
  let x = Math.floor((e.clientX-e.target.getBoundingClientRect().top)/60)
  let y = Math.floor((e.clientY-e.target.getBoundingClientRect().left)/60)
  game.put(x,y)
  draw.draw_board()
  draw.draw_discs(game.board)
}
```
置けるようになりましたか？
ここまでくればなんとか人対人での勝負はできます。
## TurnEnd
何度か打ってみると気づきますが、PASS機能がなく途中で打てなくなってしまうことがあります。また、両プレイヤーが置けない状態となったらその時点で勝敗が決しますが終わりもありません。
これらのルールを実装しましょう。
以下のサイトを参考にテストを作成しましょう。
[オセロ豆知識](https://www.hasera.net/othello/mame.html)
### renderer.test.js
```
  describe('pass', () => {
    it('最速PASS手順', () => {
      const game = new Game()
      game.put(4,5)
      game.put(5,5)
      game.put(2,3)
      game.put(4,6)
      game.put(4,7)
      game.put(3,7)
      game.put(6,5)
      const def_player = game.player
      game.put(5,7)
      //PASSされて同じプレイヤーに戻ること
      expect(def_player).toBe(game.player)
      console.log(game.board.map(x=>x.map(y=>y==-1?2:y).join('') ) )
    })
  })
```
PASSを実装するにはプレイヤーが置けるかどうか判断する必要があります。
まずは盤面における場所があるか確認する処理を追加しましょう。
### game.js
```
  canPutChecker(){
    let canPutBoard = [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0]
    ]
    for( let x = 0; x <= 7; x++ ){
      for( let y = 0; y <= 7; y++ ){
        canPutBoard[x][y] = this.canPut(x,y)
      }
    }
    return canPutBoard
  }
```
関数の確認のためにテストを書きます。
この辺りはテストがしづらくなるため一度consoleログで確認し問題がなければ比較式で書き直すという方法で作成しています。二つ目のチェックを比較式に直してみてください。
### renderer.test.js
```
    it('チェックXチェック' ,() => {
      const game = new Game()
      expect(game.canPutChecker().map(x=>x.map(y=>y==true?1:0) ) ).toStrictEqual(
        [
          [0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0],
          [0,0,0,1,0,0,0,0],
          [0,0,1,0,0,0,0,0],
          [0,0,0,0,0,1,0,0],
          [0,0,0,0,1,0,0,0],
          [0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0]
        ]
      )
      game.put(4,5)
      console.log(game.canPutChecker().map(x=>x.map(y=>y==true?1:0).join(',') ) )
    })
```

置けるかどうかのチェックが出来るようになったのでTurnEnd関数を作成します。
### game.js
```
  disc_count(player){
    let count=0
    //配列全てをサマリして置ける箇所数を出す
    this.board.forEach(x=>x.forEach(y=>y==player?count++:null))
    return count
  }
  turnEnd(){
    let sum=0
    //配列全てをサマリして置ける箇所数を出す
    this.canPutChecker().forEach(x=>x.forEach(y=>sum+=y))
    if( sum == 0 ){
      //プレイヤーをPASS
      this.player = -this.player
      //配列全てをサマリして置ける箇所数を出す
      sum = 0
      this.canPutChecker().forEach(x=>x.forEach(y=>sum+=y))
      if( sum == 0){
        return true
      }
    }
    return false
  }
```
ここでテストを実行し問題ないことを確認してください。
あとはこれらを画面に反映させます。
### reversi.js
```
import Game from '../renderer/game' ;
import Draw from '../renderer/draw' ;
var context = document.getElementById("canv").getContext('2d');

context.canvas.addEventListener('mouseup', ev_mouseClick)
var game = new Game()
var draw = new Draw(context)
draw.draw_discs(game.board)

function ev_mouseClick(e) {
  let x = Math.floor((e.clientX-e.target.getBoundingClientRect().top)/60)
  let y = Math.floor((e.clientY-e.target.getBoundingClientRect().left)/60)
  game.put(x,y)
  draw.draw_board()
  draw.draw_discs(game.board)
  if(game.turnEnd()){
    alert(
      game.disc_count(1)>game.disc_count(-1)?"黒の勝利です":
      game.disc_count(1)<game.disc_count(-1)?"白の勝利です":
      "ドローです"
    )
    game = new Game()
    draw.draw_board()
    draw.draw_discs(game.board)
  }
}
```
これで実装が終わりと行きたいところですが、実際に起動してみると最後の石を置いた時点でアラートが出てしまい石が置かれず勝敗が出てしまいます。
draw系の処理が非同期処理で行われておりalertは同期処理のため先に処理されてしまうためです。これを解消しましょう。
### reversi.js
```
    setTimeout(()=>{
      alert(
        game.disc_count(1)>game.disc_count(-1)?"黒の勝利です":
        game.disc_count(1)<game.disc_count(-1)?"白の勝利です":
        "ドローです"
      )
      game = new Game()
      draw.draw_board()
      draw.draw_discs(game.board)
    },0)
```
setTimeoutを使ってアラートも非同期処理としてみました。
こちらの方法でも問題なく動作するかと思います。
しかし、こちらの方法は動作順序が保証されているものではないためdraw系の処理を同期処理に変えることが望ましいです。
async/awaitを使ってみましょう。
### コマンド
```
npm install @babel/polyfill --save-dev
```

### web pack.config.js
``` 
entry: {
    "reversi": ['@babel/polyfill',"./renderer/reversi.js"]
  }
```

これで基本的な実装に関しては終了です！
交互に打てば最後の勝利判定までしてくれます。

次の章では見た目とAI機能の実装を行います！
置ける場所を光らせたり、今どちらのプレイヤーか表示したりと便利機能を実装していきましょう。
