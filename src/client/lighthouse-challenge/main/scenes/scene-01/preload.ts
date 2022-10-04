import { BOMB, GROUND, SKY, STAR, DUDE } from '../../../const'
import { bombImg, platformImg, skyImg, starImg, dudeImg } from '../../../assets'

export function preload() {
    // @ts-ignore
    const load: Phaser.Loader.LoaderPlugin = this.load
    load.image(BOMB, bombImg)
    load.image(GROUND, platformImg)
    load.image(SKY, skyImg)
    load.image(STAR, starImg)
    load.spritesheet(DUDE, dudeImg, {
        frameWidth: 32,
        frameHeight: 48,
    })
}
