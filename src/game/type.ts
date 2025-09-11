import ColorPicker from 'phaser3-rex-plugins/templates/ui/colorinput/colorpicker/ColorPicker'

export enum Direction {
  UP = 0,
  RIGHT = 90,
  DOWN = 180,
  LEFT = 270,
}

export type Ant = { x: number, y: number, direction: Direction, sprite: Phaser.GameObjects.Rectangle, color: number, colorPicker?: ColorPicker }
export type Cell = { value: number, occupant: Ant | null, pixel?: Phaser.GameObjects.Rectangle, color: number }