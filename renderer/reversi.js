import Game from '../renderer/game' ;
import Draw from '../renderer/draw' ;
var context = document.getElementById("canv").getContext('2d');

context.canvas.addEventListener('mouseup', ev_mouseClick)
var game = new Game()
var draw = new Draw(context)
draw.put_point_highlight(game.player,game.canPutChecker())
draw.draw_discs(game.board)

function ev_mouseClick(e) {
  let x = Math.floor((e.clientX-e.target.getBoundingClientRect().top)/60)
  let y = Math.floor((e.clientY-e.target.getBoundingClientRect().left)/60)
  //ダイアログ呼び出しを非同期としてPromiseでラップする
  //resolveはthenメソッドに渡された処理を実行する
  let alertWithNoBlock = msg => new Promise(
    (resolve, reject) => setTimeout(() => resolve(alert(msg)), 0));
  game.put(x,y)
  draw.draw_board()
  draw.put_point_highlight(game.player,game.canPutChecker())
  draw.draw_discs(game.board)
  if(game.turnEnd()){
    alertWithNoBlock(
      game.disc_count(1)>game.disc_count(-1)?"黒の勝利です":
      game.disc_count(1)<game.disc_count(-1)?"白の勝利です":
      "ドローです"
    ).then(result => {
      game = new Game()
      draw.draw_board()
      draw.put_point_highlight(game.player,game.canPutChecker())
      draw.draw_discs(game.board)
    });
  }
}