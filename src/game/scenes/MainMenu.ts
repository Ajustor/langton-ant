import { Scene, GameObjects } from 'phaser'

export class MainMenu extends Scene {
    background: GameObjects.Image
    logo: GameObjects.Image
    title: GameObjects.Text

    constructor() {
        super('MainMenu')
    }

    create() {
        const title = 'Langton\'s Ant'
        const fontSize = 64
        this.background = this.add.image(window.innerWidth / 2, 384, 'background')

        this.add.text(window.innerWidth / 2 - ((title.length * fontSize) / 3), 300, title, {
            fontFamily: 'Arial Black', fontSize, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        })

        this.title = this.add.text(window.innerWidth / 2, 460, 'Commencer', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).on('pointerdown', () => {
            this.scene.start('Game')
        }).setInteractive()

        // this.input.once('pointerdown', () => {

        //     this.scene.start('Game')

        // })
    }
}
