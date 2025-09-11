import { Scene } from 'phaser'
import { Ant, Cell, Direction } from '../type'
import { moveAnt, setAntDirection, swapColor } from '../systems/langton'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'


const PADDING = 1

const ACTIVE_COLOR = 0x000000
const INACTIVE_COLOR = 0xffffff

const PIXEL_SIZE = 10

export const MATRIX_WIDTH = ~~(window.innerWidth / (PIXEL_SIZE))
export const MATRIX_HEIGHT = ~~(window.innerHeight / (PIXEL_SIZE))

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera
    rexUI: RexUIPlugin
    private matrix: Cell[][]
    private isPaused = false

    private ant: Ant

    constructor() {
        super('Game')

        this.matrix = Array.from({ length: MATRIX_HEIGHT }, () =>
            Array.from({ length: MATRIX_WIDTH }, () => ({ value: 0, occupant: null, pixel: undefined, color: ACTIVE_COLOR }))
        )
    }

    private initGrid() {
        for (const y of this.matrix.keys()) {
            for (const x of this.matrix[y].keys()) {
                const cell = this.matrix[y][x]
                cell.pixel = this.add.rectangle(x * (PIXEL_SIZE + PADDING), y * (PIXEL_SIZE + PADDING), PIXEL_SIZE, PIXEL_SIZE, cell.value ? cell.color : INACTIVE_COLOR)
                cell.pixel.setInteractive().on('pointerdown', () => {
                    swapColor(cell, ACTIVE_COLOR)
                })
            }
        }

        this.ant = { direction: Direction.DOWN, x: ~~(MATRIX_WIDTH / 2), y: ~~(MATRIX_HEIGHT / 2), sprite: this.add.rectangle((~~(MATRIX_WIDTH / 2)) * (PIXEL_SIZE + PADDING), (~~(MATRIX_HEIGHT / 2)) * (PIXEL_SIZE + PADDING), PIXEL_SIZE, PIXEL_SIZE, 0xff0000), color: ACTIVE_COLOR }
    }

    create() {

        this.camera = this.cameras.main
        this.camera.setBackgroundColor(0x777777)

        this.initGrid()

        this.time.addEvent({
            delay: 1,
            loop: true,
            callback: this.calculateAnt,
            callbackScope: this
        })
        this.ant.colorPicker = this.rexUI.add.colorPicker({
            background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x888888),
            svPalette: {
                width: 100,
                height: 100,
            },

            value: this.ant.color,
            valuechangeCallback: (value: number) => {
                this.ant.color = value
            }
        })

        this.ant.colorPicker?.setPosition(window.innerWidth / 2, window.innerHeight / 2).layout().setScale(0)

        this.ant.sprite.setInteractive().on('pointerdown', () => {
            if (this.ant.colorPicker?.scaleX === 1) {
                this.ant.colorPicker?.scaleDown(1000)
            } else {
                this.ant.colorPicker?.setScale(1).popUp(1000)
            }
        })


        this.input.keyboard?.on('keydown', (event: KeyboardEvent) => {


            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.SPACE) {
                this.isPaused = !this.isPaused
            }

        })
    }

    async update(time: number, delta: number): Promise<void> {
        for (const row of this.matrix) {
            for (const cell of row) {
                if (cell.pixel) {
                    cell.pixel.fillColor = cell.value ? cell.color : INACTIVE_COLOR
                }
            }
        }

    }

    private calculateAnt() {
        if (this.isPaused) {
            return
        }
        setAntDirection(this.ant, this.matrix[this.ant.y][this.ant.x])
        swapColor(this.matrix[this.ant.y][this.ant.x], this.ant.color)
        moveAnt(this.ant)

        this.ant.sprite.x = this.ant.x * (PIXEL_SIZE + PADDING)
        this.ant.sprite.y = this.ant.y * (PIXEL_SIZE + PADDING)
    }
}
