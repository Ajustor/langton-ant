import { MATRIX_HEIGHT, MATRIX_WIDTH } from '../scenes/Game'
import { Ant, Cell, Direction } from '../type'

export function swapColor(cell: Cell, newColor: number) {
  cell.color = newColor
  cell.value ^= 1
}

export function setAntDirection(ant: Ant, cell: Cell) {
  if (cell.value === 0) {
    ant.direction = (ant.direction + 90) % 360
  } else {
    ant.direction = (ant.direction - 90 + 360) % 360
  }
}

export function moveAnt(ant: Ant) {
  switch (ant.direction) {
    case Direction.LEFT:
      if (ant.x > 0) {
        ant.x -= 1
      } else {
        ant.x = MATRIX_WIDTH - 1
      }
      break
    case Direction.RIGHT:
      if (ant.x < MATRIX_WIDTH - 1) {
        ant.x += 1
      } else {
        ant.x = 0
      }
      break
    case Direction.UP:
      if (ant.y > 0) {
        ant.y -= 1
      } else {
        ant.y = MATRIX_HEIGHT - 1
      }
      break
    case Direction.DOWN:
      if (ant.y < MATRIX_HEIGHT - 1) {
        ant.y += 1
      } else {
        ant.y = 0
      }
      break
  }
}