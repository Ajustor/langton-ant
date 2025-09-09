import { Scene } from 'phaser'
import { Cell } from '../type'
import { swapColor } from '../systems/langton'

const PADDING = 10

const WINDOW_CENTER_X = window.innerWidth / 2
const WINDOW_CENTER_Y = window.innerHeight / 2

const ACTIVE_COLOR = 0xffffff
const INACTIVE_COLOR = 0x000000

const PIXEL_SIZE = 30

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera
    private matrix: Cell[][]

    constructor() {
        super('Game')

        this.matrix = Array.from({ length: 50 }, () =>
            Array.from({ length: 50 }, () => ({ value: 0, occupant: null, pixel: undefined }))
        )
    }

    private initGrid() {
        for (const y of this.matrix.keys()) {
            for (const x of this.matrix[y].keys()) {
                const cell = this.matrix[y][x]
                cell.pixel = this.add.rectangle(WINDOW_CENTER_X - (WINDOW_CENTER_X / 2) + x + PADDING + (PIXEL_SIZE), WINDOW_CENTER_Y - (WINDOW_CENTER_Y / 2) + y + PADDING + (PIXEL_SIZE), PIXEL_SIZE, PIXEL_SIZE, cell.value ? ACTIVE_COLOR : INACTIVE_COLOR)
                cell.pixel.setInteractive().on('pointerdown', () => {
                    swapColor(cell)
                })
            }
        }
    }

    create() {
        this.camera = this.cameras.main
        this.camera.setBackgroundColor(0x777777)

        this.initGrid()


        this.input.on('pointerdown', (event: PointerEvent) => {

            console.log(event)

        })
    }

    update(time: number, delta: number): void {
        for (const row of this.matrix) {
            for (const cell of row) {
                if (cell.pixel) {
                    cell.pixel.fillColor = cell.value ? ACTIVE_COLOR : INACTIVE_COLOR
                }
            }
        }

    }
}
