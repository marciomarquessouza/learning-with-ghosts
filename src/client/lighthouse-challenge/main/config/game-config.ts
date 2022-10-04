import Phaser from 'phaser'
import { GRAVITY, HEIGHT, WIDTH } from '../../const'

export const config = (
    scene: Phaser.Types.Scenes.CreateSceneFromObjectConfig
): Phaser.Types.Core.GameConfig => {
    return {
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: window.innerWidth,
            height: window.innerHeight,
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: GRAVITY },
                debug: false,
            },
        },
        scene,
    }
}
