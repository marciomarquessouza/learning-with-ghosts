import { SceneElement } from './Scene'

export type Background = {
    x: number
    y: number
    image: string
}

export type Platform = {
    x: number
    y: number
    image: string
    scale?: number
}

export class Scenario implements SceneElement {
    name: string = ''
    background: Background = { y: 0, x: 0, image: '' }
    platforms: Platform[] = []
}
