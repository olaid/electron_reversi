import Game from '../renderer/game' ;
import Draw from '../renderer/draw' ;
import Ai from '../renderer/ai' ;
var context = document.getElementById("canv").getContext('2d');

context.canvas.addEventListener('mouseup', ev_mouseClick)
var game = new Game()
var draw = new Draw(context)
draw.put_point_highlight(game.player,game.canPutChecker())
draw.draw_discs(game.board)

function ev_mouseClick(e) {
  let x = Math.floor((e.clientX-e.target.getBoundingClientRect().top)/60)
  let y = Math.floor((e.clientY-e.target.getBoundingClientRect().left)/60)
  game.put(x,y)
  draw_phase()
  while (game.player == -1){
    let cpu = Ai.getPutPosition(game.board,game.player)
    game.put(cpu[0],cpu[1])
    draw_phase()
  }
}

function draw_phase(){
  //ダイアログ呼び出しを非同期としてPromiseでラップする
  //resolveはthenメソッドに渡された処理を実行する
  let alertWithNoBlock = msg => new Promise(
    (resolve, reject) => setTimeout(() => resolve(alert(msg)), 0))
  draw.draw_board()
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
  draw.put_point_highlight(game.player,game.canPutChecker())
}