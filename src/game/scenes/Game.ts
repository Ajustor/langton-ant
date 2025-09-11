import { Scene } from 'phaser'
import { Ant, Cell, Direction } from '../type'
import { moveAnt, setAntDirection, swapColor } from '../systems/langton'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'
import { v4 } from 'uuid'


const PADDING = 1

const ACTIVE_COLOR = 0x000000
const INACTIVE_COLOR = 0xffffff

const PIXEL_SIZE = 10
const EXPLOSION_RADIUS = 10

export const MATRIX_WIDTH = ~~(window.innerWidth / (PIXEL_SIZE))
export const MATRIX_HEIGHT = ~~(window.innerHeight / (PIXEL_SIZE))

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera
    rexUI: RexUIPlugin
    private matrix: Cell[][]
    private isPaused = false

    private ants: Map<string, Ant> = new Map()

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


        this.input.keyboard?.on('keydown', (event: KeyboardEvent) => {


            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.SPACE) {
                this.isPaused = !this.isPaused
            }

            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.A) {
                this.addAnt()
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

    private addAnt() {
        const newAnt: Ant = { direction: Direction.DOWN, x: ~~(MATRIX_WIDTH / 2), y: ~~(MATRIX_HEIGHT / 2), sprite: this.add.rectangle((~~(MATRIX_WIDTH / 2)) * (PIXEL_SIZE + PADDING), (~~(MATRIX_HEIGHT / 2)) * (PIXEL_SIZE + PADDING), PIXEL_SIZE, PIXEL_SIZE, 0xff0000), color: ACTIVE_COLOR }
        newAnt.colorPicker = this.rexUI.add.colorPicker({
            background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x888888),
            svPalette: {
                width: 100,
                height: 100,
            },

            value: newAnt.color,
            valuechangeCallback: (value: number) => {
                newAnt.color = value
            }
        })
        newAnt.colorPicker?.setPosition(window.innerWidth / 2, window.innerHeight / 2).layout().setScale(0)

        newAnt.sprite.setInteractive().on('pointerdown', () => {
            this.closeColorPickers()

            if (newAnt.colorPicker?.scaleX === 1) {
                newAnt.colorPicker?.scaleDown(1000)
            } else {
                newAnt.colorPicker?.setScale(1).popUp(1000)
            }
        })

        this.ants.set(v4(), newAnt)
    }

    private closeColorPickers() {
        for (const ant of this.ants.values()) {
            ant.colorPicker?.scaleDown(1000)
        }
    }

    private checkCollisions() {
        for (const [key, ant] of this.ants.entries()) {
            const otherAntsAtSamePlace = [...this.ants.entries()].filter(([otherKey, otherAnt]) => otherKey !== key && otherAnt.x === ant.x && otherAnt.y === ant.y).map(([otherKey]) => otherKey)
            let colorMix = ant.color
            if (otherAntsAtSamePlace.length) {
                this.ants.delete(key)
                console.log('Explosion')
                for (const otherAntKey of otherAntsAtSamePlace) {
                    colorMix += (this.ants.get(otherAntKey)?.color || 0) % 0xffffff
                    this.ants.delete(otherAntKey)
                }

                for (const row of this.matrix) {
                    for (const cell of row) {
                        if (cell.pixel) {
                            if (cell.pixel.x > ant.sprite.x - EXPLOSION_RADIUS && cell.pixel.x < ant.sprite.x + EXPLOSION_RADIUS && cell.pixel.y > ant.sprite.y - EXPLOSION_RADIUS && cell.pixel.y < ant.sprite.y + EXPLOSION_RADIUS) {
                                swapColor(cell, colorMix)
                            }
                        }
                    }
                }
            }
        }
    }

    private calculateAnt() {
        if (this.isPaused) {
            return
        }
        for (const ant of this.ants.values()) {
            setAntDirection(ant, this.matrix[ant.y][ant.x])
            swapColor(this.matrix[ant.y][ant.x], ant.color)
            moveAnt(ant)
            ant.sprite.x = ant.x * (PIXEL_SIZE + PADDING)
            ant.sprite.y = ant.y * (PIXEL_SIZE + PADDING)
        }

        this.checkCollisions()
    }
}
