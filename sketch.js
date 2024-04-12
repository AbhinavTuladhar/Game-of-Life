const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
const BOX_SIZE = 15

const ROWS = Math.floor(HEIGHT / BOX_SIZE)
const COLS = Math.floor(WIDTH / BOX_SIZE)

let game

/**
 * Generates a 2D array with the specified number of rows and columns.
 *
 * @param {number} row - The number of rows in the 2D array
 * @param {number} columns - The number of columns in the 2D array
 * @return {Array} A 2D array with the specified number of rows and columns
 */
const make2DArray = (row, columns) => [...Array(row)].map(() => Array(columns))

class GameOfLife {
  constructor() {
    this.grid = new Array(COLS)
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(ROWS)
    }

    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j < ROWS; j++) {
        this.grid[i][j] = Math.floor(random(2))
      }
    }
  }

  /**
   * A function that counts the number of neighbors for a given cell position.
   *
   * @param {number} x - the x-coordinate of the cell position
   * @param {number} y - the y-coordinate of the cell position
   * @return {number} the total number of neighbours for the cell position
   */
  countNeighbours(x, y) {
    let count = 0
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let col = (x + i + COLS) % COLS
        let row = (y + i + ROWS) % ROWS
        count += this.grid[col][row]
      }
    }
    return count
  }

  drawGrid() {
    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j < ROWS; j++) {
        if (this.grid[i][j] === 1) {
          fill(255)
        } else {
          fill(0)
        }
        rect(i * BOX_SIZE, j * BOX_SIZE, BOX_SIZE - 1, BOX_SIZE - 1)
      }
    }
  }
}

function setup() {
  createCanvas(WIDTH, HEIGHT)
  frameRate(20)
  game = new GameOfLife()
}

function draw() {
  background(0)
  game.drawGrid()
}
