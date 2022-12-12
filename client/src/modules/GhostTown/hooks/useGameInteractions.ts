import { useContext } from 'react'
import { InteractionContext } from '../contexts/InteractionContext'

export function useGameInteraction() {
    return useContext(InteractionContext)
}
