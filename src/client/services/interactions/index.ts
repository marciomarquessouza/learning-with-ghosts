import { Utils } from '../../utils/types'
import { Levels } from '../levels'
import { Interactions } from './Interactions'

export interface InteractionsProps {
    levels: Levels
    utils: Utils
}

function createInteractions({ levels, utils }: InteractionsProps) {
    return new Interactions(levels, utils)
}

export { createInteractions, Interactions }
