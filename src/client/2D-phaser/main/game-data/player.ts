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
                type: ANIMATION_TYPE.MULTIPLE,
                key: GHOST,
                start: 0,
                end: 3,
            },
            frameRate: 10,
            repeat: -1,
        },
        {
            key: ANIMATION_KEY.TURN,
            frames: {
                type: ANIMATION_TYPE.UNIQUE,
                frame: [{ key: GHOST, frame: 4 }],
            },
            frameRate: 20,
        },
        {
            key: ANIMATION_KEY.RIGHT,
            frames: {
                type: ANIMATION_TYPE.MULTIPLE,
                key: GHOST,
                start: 5,
                end: 8,
            },
            frameRate: 10,
            repeat: -1,
        },
    ],
}

export const playerObserver = new SceneElementObserver()
const handleObserver = new ProxyObserverHandle<Player>('player', playerObserver)
export const player = new Proxy(new Player(playerInitializer), handleObserver)
