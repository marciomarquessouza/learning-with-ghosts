import MainSceneElement from './MainSceneElement'

export interface MainSceneElementProps {
    mainScene: HTMLCanvasElement
}

export default function createMainSceneElement(props: MainSceneElementProps) {
    return new MainSceneElement(props)
}
