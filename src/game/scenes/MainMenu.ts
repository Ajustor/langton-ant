import { Scene, GameObjects } from 'phaser'

export class MainMenu extends Scene {
    logo: GameObjects.Image
    title: GameObjects.Text

    constructor() {
        super('MainMenu')
    }

    create() {
        const title = 'Langton\'s Ant'
        const fontSize = 64

        this.add.text(window.innerWidth / 2, 300, title, {
            fontFamily: 'Arial Black', fontSize, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5)

        this.title = this.add.text(window.innerWidth / 2, 460, 'Commencer', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).on('pointerdown', () => {
            this.scene.start('Game')
        }).setInteractive()

        this.add.text(window.innerWidth / 2, 540, 'Appuyez sur A pour ajouter une fourmi\nAppuyez sur la barre espace pour mettre en pause', {
            fontFamily: 'Arial Black', fontSize: 18, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5)

        // this.input.once('pointerdown', () => {

        //     this.scene.start('Game')

        // })
    }
}
