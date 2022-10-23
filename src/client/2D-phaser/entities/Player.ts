import { ANIMATION_KEY, ANIMATION_TYPE } from '../const'
import { SceneElement } from './Scene'

export interface PlayerAnimation {
    key: ANIMATION_KEY
    frames:
        | {
              type: ANIMATION_TYPE.MULTIPLE
              key: string
              start: number
              end: number
          }
        | {
              type: ANIMATION_TYPE.UNIQUE
              frame: { key: string; frame: number }[]
          }
    frameRate: number
    repeat?: number
}

export interface Sprite {
    x: number
    y: number
    image: string
}

export interface Velocity {
    x?: number
    y?: number
}

type PlayerStatus = 'idle' | 'created' | 'error'

export class Player implements SceneElement {
    name: string = ''
    status: PlayerStatus = 'idle'
    sprite: Sprite = { x: 0, y: 0, image: '' }
    bounce: number = 0
    isCollideWorldBounds: boolean = false
    animations: PlayerAnimation[] = []
    key?: ANIMATION_KEY
    ignoreIfPlaying?: boolean
    velocityX?: number
    velocityY?: number
    none?: boolean
    up?: boolean
    down?: boolean
    left?: boolean
    right?: boolean

    constructor(props: Player) {
        Object.assign(this, props)
    }
}
