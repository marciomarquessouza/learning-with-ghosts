import * as THREE from 'three'
import { GUI } from 'dat.gui'
import { Train } from '../../models'

export function createAnimationFolders(train: Train) {
    if (process.env.NODE_ENV === 'development') {
        const gui = new GUI()
        const animationsFolder = gui.addFolder('Animations')

        const playArrivalAnimation = () => {
            train.startArrivalAnimation()
        }

        const playDepartureAnimation = () => {
            train.startDepartureAnimation()
        }

        const animations = {
            'train-arrival': playArrivalAnimation,
            'train-departure': playDepartureAnimation,
        }

        animationsFolder.add(animations, 'train-arrival')
        animationsFolder.add(animations, 'train-departure')
    }
}
