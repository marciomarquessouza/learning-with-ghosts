import { ANIMATION_KEY } from '../../const'
import { PlayAnimation, PlayAnimationAdapter } from '../../data'
import { Player } from '../../entities'

export class PlayAnimationUseCase implements PlayAnimation {
    constructor(private playAnimation: PlayAnimationAdapter) {}

    execute(player: Player, key: ANIMATION_KEY, ignoreIfPlaying?: boolean): void {
        this.playAnimation.play(player, key, ignoreIfPlaying)
    }
}
