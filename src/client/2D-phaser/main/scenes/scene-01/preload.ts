import { BOMB, GROUND, SKY, STAR, LIGHTHOUSE_BACKGROUND, GHOST } from '../../../const'
import {
    bombImg,
    ground,
    skyImg,
    starImg,
    lighthouseBackground,
    ghostFrames,
} from '../../../assets'

export function preload() {
    // @ts-ignore
    const load: Phaser.Loader.LoaderPlugin = this.load
    load.image(BOMB, bombImg)
    load.image(GROUND, ground)
    load.image(SKY, skyImg)
    load.image(STAR, starImg)
    load.image(LIGHTHOUSE_BACKGROUND, lighthouseBackground)
    load.spritesheet(GHOST, ghostFrames, {
        frameWidth: 38,
        frameHeight: 58,
    })
}
