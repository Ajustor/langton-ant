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
      ant.x -= 1
      break
    case Direction.RIGHT:
      ant.x += 1
      break
  }
}