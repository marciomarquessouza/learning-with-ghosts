import { useContext } from 'react'
import { GameContentContext } from '../contexts/GameContentContext'

export function useGameContent() {
    return useContext(GameContentContext)
}
