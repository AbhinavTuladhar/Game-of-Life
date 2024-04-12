const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
const BOX_SIZE = 12.5

const ROWS = Math.floor(HEIGHT / BOX_SIZE)
const COLS = Math.floor(WIDTH / BOX_SIZE)

let game
let paused = true

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
        let row = (y + j + ROWS) % ROWS
        count += this.grid[col][row]
      }
    }
    // Don't count the cell itself
    count -= this.grid[x][y]
    return count
  }

  /**
   * A function that updates the grid based on the number of neighbors.
   */
  updateGrid() {
    const newState = make2DArray(COLS, ROWS)
    for (let col = 0; col < COLS; col++) {
      for (let row = 0; row < ROWS; row++) {
        const cell = this.grid[col][row]
        const neighbours = this.countNeighbours(col, row)

        /**
         * Rules for the game of life
         * 1. Any live cell with less than 2 neighbours dies.
         * 2. Any live cell with more than 3 neighbours dies.
         * 3. Any dead cell with exactly three neighbours becomes alive.
         */
        if (cell === 0 && neighbours === 3) {
          newState[col][row] = 1
        } else if (cell === 1 && (neighbours < 2 || neighbours > 3)) {
          newState[col][row] = 0
        } else {
          newState[col][row] = cell
        }
      }
    }
    this.grid = newState
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

/**
 * Pause the simulation if the `p` key is pressed
 */
function keyPressed() {
  if (keyCode === 80) {
    paused = !paused
  }
}

function setup() {
  createCanvas(WIDTH, HEIGHT)
  frameRate(60)
  game = new GameOfLife()
}

function draw() {
  background(0)
  game.drawGrid()
  if (paused) {
    game.updateGrid()
  }
}
