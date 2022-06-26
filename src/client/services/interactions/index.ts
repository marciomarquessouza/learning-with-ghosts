import { Utils } from '../../utils/types'
import { Interactions } from './Interactions'

export interface InteractionProps {
    utils: Utils
}

function createInteractions({ utils }: InteractionProps) {
    return new Interactions(utils)
}

export { createInteractions, Interactions }
