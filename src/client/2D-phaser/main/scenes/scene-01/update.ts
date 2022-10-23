import {
    makeGetCursorState,
    makeSetVelocity,
    makePlayAnimation,
    makeGetTouching,
} from '../../factories'
import { player } from '../../game-data'
import { ANIMATION_KEY, PLAYER_JUMP, PLAYER_VELOCITY } from '../../../const'
import { Player, Velocity } from '../../../entities'

const playerVelocity = (velocity: Velocity) => {
    const setVelocity = makeSetVelocity()
    setVelocity.execute({ player, velocity })
}

const touching = (player: Player) => {
    const getTouching = makeGetTouching()
    return getTouching.execute(player)
}

export function update() {
    const playAnimation = makePlayAnimation()
    const getCursorState = makeGetCursorState()
    const cursor = getCursorState.execute()

    if (cursor.left.isDown) {
        playerVelocity({ x: -PLAYER_VELOCITY })
        playAnimation.execute(player, ANIMATION_KEY.LEFT, true)
    } else if (cursor.right.isDown) {
        playerVelocity({ x: PLAYER_VELOCITY })
        playAnimation.execute(player, ANIMATION_KEY.RIGHT, true)
    } else {
        playerVelocity({ x: 0 })
        playAnimation.execute(player, ANIMATION_KEY.TURN)
    }

    if (cursor.up.isDown && touching(player).down) {
        playerVelocity({ y: -PLAYER_JUMP })
    }
}
