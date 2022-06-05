import { ELEMENTS } from '../../const'
import ElementManager from '../../libs/ElementManager'
import { MainSceneElementProps } from './index'

export default class MainSceneElement extends ElementManager<MainSceneElementProps, {}> {
    constructor(props: MainSceneElementProps) {
        super(ELEMENTS.MAIN_SCENE, props, {})
    }

    render(): HTMLElement {
        const { mainScene } = this.props
        return mainScene
    }
}
