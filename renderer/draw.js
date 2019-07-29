const COLOR_LINE = "#FFFFFF";
const COLOR_BOARD = "#00BB33";
const COLOR_WHITE = "#FFFFFF";
const COLOR_BLACK = "#000000";
const CELL_SIZE = 60;
const DISC_SIZE = 29;
export default class Drawing {
  constructor(canvas){
    this.canvas = canvas
    this.draw_board()
  }
  draw_board(){
    this.canvas.beginPath()
    this.canvas.clearRect(0,0,500,500);
    this.canvas.lineWidth = 1;
    this.canvas.fillStyle = COLOR_BOARD;
    for (var x = 0; x < 8; x++) {
        for (var y = 0; y < 8; y++) {
            this.canvas.strokeStyle = COLOR_LINE;
            this.canvas.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            this.canvas.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
  }
  draw_discs(board){
    this.board = board
    for (var x = 0; x < 8; x++) {
        for (var y = 0; y < 8; y++) {
          this.canvas.beginPath()
          if (this.board[x][y] == 1 ) {
            this.canvas.fillStyle = COLOR_BLACK;
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
          else if (this.board[x][y] == -1 ) {
            this.canvas.fillStyle = COLOR_WHITE;
            this.canvas.arc(
              x * CELL_SIZE + CELL_SIZE/2,
              y * CELL_SIZE + CELL_SIZE/2,
              DISC_SIZE ,
              0, 
              Math.PI*2, 
              false
            );
            this.canvas.fill();
          }
        }
    }
  }
}