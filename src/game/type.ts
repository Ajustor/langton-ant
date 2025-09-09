export enum Direction {
  UP = 0,
  RIGHT = 90,
  DOWN = 180,
  LEFT = 270,
}

export type Ant = { x: number, y: number, direction: Direction }
export type Cell = { value: number, occupant: Ant | null, pixel?: Phaser.GameObjects.Rectangle }