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
  //let sum=0
  //game.canPutChecker().forEach(x=>x.forEach(y=>sum+=y))
  //if( sum = 0 ) alert(game.player==1?"黒の勝利です":"白の勝利です")
}