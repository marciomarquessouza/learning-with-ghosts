import { Ghost } from './Ghost'
import checkContact, { CheckContact, CheckContactProps } from './helpers/checkContact'
import { CharacterControlsServices } from '../../scenes/controllers/character-control/CharacterControl'

export interface GhostHelpers {
    checkContact: (props: CheckContactProps) => CheckContact
}

export interface GhostServices extends CharacterControlsServices {}

export function createGhostModel(
    services: GhostServices,
    helpers: GhostHelpers = { checkContact }
) {
    return new Ghost(services, helpers)
}
