import Game from '../renderer/game' ;
import Draw from '../renderer/draw' ;
var context = document.getElementById("canv").getContext('2d');

context.canvas.addEventListener('mouseup', ev_mouseClick)
var game = new Game()
var draw = new Draw(context)
draw.draw_discs(game.board)

async function turnEach(x,y){
  return new Promise(resolve =>{
    game.put(x,y)
    draw.draw_board()
    draw.draw_discs(game.board)
    resolve()
  })
}
async function ev_mouseClick(e) {
  let x = Math.floor((e.clientX-e.target.getBoundingClientRect().top)/60)
  let y = Math.floor((e.clientY-e.target.getBoundingClientRect().left)/60)
  await turnEach(x,y)
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