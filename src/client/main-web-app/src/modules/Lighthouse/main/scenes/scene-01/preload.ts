import { BOMB, GROUND, SKY, STAR, LIGHTHOUSE_BACKGROUND, GHOST } from '../../../const'

export function preload() {
    // @ts-ignore
    const load: Phaser.Loader.LoaderPlugin = this.load
    load.image(BOMB, 'img/lighthouse/bomb.png')
    load.image(GROUND, 'img/lighthouse/ground.png')
    load.image(SKY, 'img/lighthouse/sky.png')
    load.image(STAR, 'img/lighthouse/star.png')
    load.image(LIGHTHOUSE_BACKGROUND, 'img/lighthouse/lighthouse_background.png')
    load.spritesheet(GHOST, 'img/lighthouse/ghost-frames.png', {
        frameWidth: 38,
        frameHeight: 58,
    })
}
