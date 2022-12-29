import React, { createContext, useCallback, useState, useEffect } from 'react'

import { useDocument } from 'common/hooks/useDocument'
import { LANGUAGES } from 'modules/GhostTown/const'
import { useUser } from 'modules/Auth/hooks/useUser'
import { COLLECTIONS, DEFAULT_LIVES } from 'const'

export enum CHALLENGE_STATUS {
    STARTED = 'started',
    IDLE = 'idle',
    COMPLETED = 'completed',
}

export interface ChallengeProgress {
    uid: string
    status: CHALLENGE_STATUS
    completedAt?: string
    day: number
}

export interface GameProgressState {
    language: LANGUAGES
    chapter: number
    day: number
    lives: number
}

const gameProgressStateDefault: GameProgressState = {
    language: LANGUAGES.ENGLISH,
    chapter: 1,
    day: 1,
    lives: 5,
}

export interface GameProgressContextType {
    gameProgress: GameProgressState
    challengesProgress: ChallengeProgress[]
    getGameProgress: () => GameProgressState
    getChallengesProgress: () => ChallengeProgress[]
    updateGameProgress: (updatedGameProgress: GameProgressState) => void
    updateChallengeProgress: (challengeProgress: ChallengeProgress) => void
    setChapter: (chapter: number) => void
    setNexDay: () => void
    updateLives: (type?: 'increase' | 'decrease' | 'reset') => void
    isReady: boolean
}

export const gameProgressContextDefault: GameProgressContextType = {
    gameProgress: gameProgressStateDefault,
    challengesProgress: [],
    getGameProgress: () => gameProgressStateDefault,
    getChallengesProgress: () => [],
    updateGameProgress: (updatedGameProgress: GameProgressState) => {},
    updateChallengeProgress: (challengeProgress: ChallengeProgress) => {},
    setChapter: (chapter: number) => {},
    setNexDay: () => {},
    updateLives: () => {},
    isReady: false,
}

export const GameProgressContext = createContext<GameProgressContextType>(
    gameProgressContextDefault
)

interface GameProgressProviderProps {
    children: React.ReactNode
}

function GameProgressProvider({ children }: GameProgressProviderProps) {
    const { user } = useUser()
    const { getDocument, getDocuments, setDocument } = useDocument()
    const [gameProgress, setGameProgress] = useState(gameProgressStateDefault)
    const [challengesProgress, setChallengesProgress] = useState<ChallengeProgress[]>([])
    const [isReady, setIsReady] = useState(false)

    const getUserGameProgress = useCallback(
        async (uid: string, language: LANGUAGES) => {
            const currentProgress = await getDocument<GameProgressState>(
                COLLECTIONS.USERS,
                uid,
                COLLECTIONS.PROGRESS,
                language
            )
            if (currentProgress) {
                setGameProgress(currentProgress)
                const currentChallengesProgress = await getDocuments<ChallengeProgress[]>(
                    `${COLLECTIONS.USERS}/${uid}/${COLLECTIONS.PROGRESS}/${language}/${COLLECTIONS.CHALLENGES}`,
                    ['day', '==', currentProgress.day]
                )
                setChallengesProgress(currentChallengesProgress)
            }
        },
        [getDocument, getDocuments]
    )

    const updateGameProgress = useCallback(
        async (updatedGameProgress: GameProgressState) => {
            setGameProgress(updatedGameProgress)
            if (user?.uid && user.gameLanguage) {
                setDocument(
                    updatedGameProgress,
                    COLLECTIONS.USERS,
                    user.uid,
                    COLLECTIONS.PROGRESS,
                    user.gameLanguage
                )
            }
        },
        [user, setDocument, setGameProgress]
    )

    const updateChallengesProgress = useCallback(
        async (updatedChallengeProgress: ChallengeProgress) => {
            const { uid } = updatedChallengeProgress
            const filteredChallengesProgress = challengesProgress.filter(
                (challenge) => challenge.uid !== uid
            )
            setChallengesProgress([...filteredChallengesProgress, updatedChallengeProgress])

            if (user?.uid && user.gameLanguage) {
                setDocument(
                    updatedChallengeProgress,
                    COLLECTIONS.USERS,
                    user.uid,
                    COLLECTIONS.PROGRESS,
                    user.gameLanguage,
                    COLLECTIONS.CHALLENGES,
                    uid
                )
            }
        },
        [challengesProgress, user, setDocument]
    )

    const handleGetGameProgress = useCallback(() => {
        return gameProgress
    }, [gameProgress])

    const handleGetChallengesProgress = useCallback(() => {
        return challengesProgress
    }, [challengesProgress])

    const handleUpdateGameProgress = useCallback(
        (updatedGameProgress: GameProgressState) => {
            updateGameProgress(updatedGameProgress)
        },
        [updateGameProgress]
    )

    const handleSetChapter = useCallback(
        (chapter: number) => {
            const updatedGameProgress = { ...gameProgress, chapter }
            updateGameProgress(updatedGameProgress)
        },
        [updateGameProgress, gameProgress]
    )

    const handleSetNextDay = useCallback(() => {
        const currentDay = gameProgress.day
        const updatedGameProgress = { ...gameProgress, day: currentDay + 1 }
        updateGameProgress(updatedGameProgress)
        setChallengesProgress([])
    }, [updateGameProgress, gameProgress])

    const handleUpdateLives = useCallback(
        (type?: 'increase' | 'decrease' | 'reset') => {
            const getUpdatedLives = () => {
                const { lives } = gameProgress
                if (lives < 1) return 0
                switch (type) {
                    case 'decrease':
                        return lives + 1
                    case 'reset':
                        return DEFAULT_LIVES
                    case 'decrease':
                    default:
                        return lives - 1
                }
            }
            const updatedGameProgress = { ...gameProgress, lives: getUpdatedLives() }
            updateGameProgress(updatedGameProgress)
        },
        [updateGameProgress, gameProgress]
    )

    const handleUpdateChallengeProgress = useCallback(
        (updatedChallengeProgress: ChallengeProgress) => {
            updateChallengesProgress(updatedChallengeProgress)
        },
        [updateChallengesProgress]
    )

    useEffect(() => {
        if (user?.uid && user.gameLanguage) {
            getUserGameProgress(user.uid, user.gameLanguage).then(() => {
                setIsReady(true)
            })
        }
    }, [user, getUserGameProgress])

    return (
        <GameProgressContext.Provider
            value={{
                isReady,
                gameProgress,
                challengesProgress,
                getGameProgress: handleGetGameProgress,
                getChallengesProgress: handleGetChallengesProgress,
                updateGameProgress: handleUpdateGameProgress,
                updateChallengeProgress: handleUpdateChallengeProgress,
                setChapter: handleSetChapter,
                setNexDay: handleSetNextDay,
                updateLives: handleUpdateLives,
            }}
        >
            {children}
        </GameProgressContext.Provider>
    )
}

export default GameProgressProvider
