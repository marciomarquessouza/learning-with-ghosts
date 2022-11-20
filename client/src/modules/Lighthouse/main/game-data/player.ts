import { ANIMATION_KEY, ANIMATION_TYPE, BOUNCE, GHOST } from '../../const'
import { Player } from '../../entities'
import { ProxyObserverHandle } from '../adapters/proxy-observer.adapter'
import { SceneElementObserver } from '../observers'

const playerInitializer: Player = {
    name: GHOST,
    status: 'idle',
    bounce: BOUNCE,
    sprite: {
        x: 100,
        y: 0,
        image: GHOST,
    },
    isCollideWorldBounds: true,
    animations: [
        {
            key: ANIMATION_KEY.LEFT,
            frames: {
                type: ANIMATION_TYPE.UNIQUE,
                frame: [{ key: GHOST, frame: 0 }],
            },
            frameRate: 20,
        },
        {
            key: ANIMATION_KEY.TURN,
            frames: {
                type: ANIMATION_TYPE.UNIQUE,
                frame: [{ key: GHOST, frame: 1 }],
            },
            frameRate: 20,
        },
        {
            key: ANIMATION_KEY.RIGHT,
            frames: {
                type: ANIMATION_TYPE.UNIQUE,
                frame: [{ key: GHOST, frame: 2 }],
            },
            frameRate: 20,
        },
    ],
}

export const playerObserver = new SceneElementObserver()
const handleObserver = new ProxyObserverHandle<Player>('player', playerObserver)
export const player = new Proxy(new Player(playerInitializer), handleObserver)
