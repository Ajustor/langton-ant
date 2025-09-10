import { MATRIX_SIZE } from '../scenes/Game'
import { Ant, Cell, Direction } from '../type'

export function swapColor(cell: Cell) {
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
        ant.x = MATRIX_SIZE - 1
      }
      break
    case Direction.RIGHT:
      if (ant.x < MATRIX_SIZE - 1) {
        ant.x += 1
      } else {
        ant.x = 0
      }
      break
    case Direction.UP:
      if (ant.y > 0) {
        ant.y -= 1
      } else {
        ant.y = MATRIX_SIZE - 1
      }
      break
    case Direction.DOWN:
      if (ant.y < MATRIX_SIZE - 1) {
        ant.y += 1
      } else {
        ant.y = 0
      }
      break
  }
}