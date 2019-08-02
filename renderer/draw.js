const COLOR_LINE = "#FFFFFF";
const COLOR_BOARD = "#00BB33";
const COLOR_WHITE = "#FFFFFF";
const COLOR_BLACK = "#000000";
const CELL_SIZE = 60;
const DISC_SIZE = 29;
export default class Draw {
  constructor(canvas){
    this.canvas = canvas
    this.draw_board()
  }
  draw_board(){
    this.canvas.beginPath()
    this.canvas.clearRect(0,0,500,500)
    this.canvas.lineWidth = 1;
    this.canvas.strokeStyle = COLOR_LINE
    this.canvas.fillStyle = COLOR_BOARD
    for (var x = 0; x < 8; x++) {
        for (var y = 0; y < 8; y++) {
            this.canvas.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            this.canvas.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
  }
  draw_discs(board){
    this.canvas.shadowBlur = 1;
    this.canvas.shadowOffsetX = 1;
    this.canvas.shadowOffsetY = 1;
    let gradient

    for (var x = 0; x < 8; x++) {
      for (var y = 0; y < 8; y++) {
        this.canvas.beginPath()
        if (board[x][y] == 1 ) {
          this.canvas.shadowColor = COLOR_WHITE
          gradient = this.canvas.createLinearGradient(
              x * CELL_SIZE,
              y * CELL_SIZE,
              x * CELL_SIZE+CELL_SIZE,
              y * CELL_SIZE+CELL_SIZE
            )
          gradient.addColorStop(0, 'rgb(180, 180, 180)')
          gradient.addColorStop(0.4, COLOR_BLACK)
          gradient.addColorStop(1, COLOR_BLACK)
          this.canvas.fillStyle = gradient
          this.canvas.arc(
            x * CELL_SIZE + CELL_SIZE/2,
            y * CELL_SIZE + CELL_SIZE/2,
            DISC_SIZE,
            0, 
            Math.PI*2, 
            false
          );
          this.canvas.fill();
        }
        else if (board[x][y] == -1 ) {
          this.canvas.shadowColor = COLOR_BLACK
          gradient = this.canvas.createLinearGradient(
              x * CELL_SIZE,
              y * CELL_SIZE,
              x * CELL_SIZE+CELL_SIZE,
              y * CELL_SIZE+CELL_SIZE
            )
          gradient.addColorStop(0, COLOR_WHITE)
          gradient.addColorStop(0.4, COLOR_WHITE)
          gradient.addColorStop(1, 'rgb(180, 180, 180)')
          this.canvas.fillStyle = gradient
          this.canvas.arc(
            x * CELL_SIZE + CELL_SIZE/2,
            y * CELL_SIZE + CELL_SIZE/2,
            DISC_SIZE ,
            0, 
            Math.PI*2, 
            false
          )
          this.canvas.fill();
        }
      }
    }
    this.canvas.shadowColor = "rgba(0, 0, 0, 0)";
  }
  put_point_highlight(pleyer,board){
    this.canvas.fillStyle = pleyer==1?COLOR_BLACK:COLOR_WHITE
    this.canvas.globalAlpha = pleyer==1?0.2:0.4
    for (var x = 0; x < 8; x++) {
      for (var y = 0; y < 8; y++) {
        this.canvas.beginPath()
        if (board[x][y] == 1 ) {
          this.canvas.arc(
            x * CELL_SIZE + CELL_SIZE/2,
            y * CELL_SIZE + CELL_SIZE/2,
            DISC_SIZE ,
            0, 
            Math.PI*2, 
            false
          )
          this.canvas.fill();
        }
      }
    }
    this.canvas.globalAlpha = 1
  }
}