import { ANIMATION_KEY, ANIMATION_TYPE } from '../../../const'
import { Player, PlayerAnimation } from '../../../entities'
import { GetTouching } from '../../../data'
import { playerPhaser } from '../phaser-elements.cache'
import { sceneHelper } from './Scene.helper'

class PlayerHelper {
    async createPlayer(player: Player): Promise<void> {
        const { sprite, bounce, isCollideWorldBounds, name } = player
        const { x, y, image } = sprite
        const scene = sceneHelper.getScene()
        const createdPlayer = scene.physics.add.sprite(x, y, image)
        createdPlayer.setBounce(bounce)
        createdPlayer.setCollideWorldBounds(isCollideWorldBounds)
        createdPlayer.setName(name)
        playerPhaser.set(name, createdPlayer)
    }

    private createFrames(animation: PlayerAnimation) {
        const { frames } = animation
        const scene = sceneHelper.getScene()
        return frames.type === ANIMATION_TYPE.UNO
            ? frames.frame
            : scene.anims.generateFrameNumbers(frames.key, {
                  start: frames.start,
                  end: frames.end,
              })
    }

    createAnimation(player: Player): void {
        const scene = sceneHelper.getScene()
        player.animations.map((animation) => {
            const { key, frameRate, repeat } = animation
            const frames = this.createFrames(animation)
            scene.anims.create({ key, frames, frameRate, repeat })
        })
    }

    async setVelocityX(name: string, x: number): Promise<void> {
        playerPhaser.get(name).setVelocityX(x)
    }

    async setVelocityY(name: string, y: number): Promise<void> {
        playerPhaser.get(name).setVelocityY(y)
    }

    async playAnimation(
        name: string,
        key: ANIMATION_KEY,
        ignoreIfPlaying?: boolean
    ): Promise<void> {
        playerPhaser.get(name).anims.play(key, ignoreIfPlaying)
    }

    getTouching(name: string): GetTouching.Result {
        const touching = playerPhaser.get(name).body.touching
        return { ...touching }
    }
}

export const playerHelper = new PlayerHelper()
