import { InfoMenuProps } from '../elements/info-menu/InfoMenu'

export enum CHARACTER {
    GHOST = 'ghost',
    PRINCESS = 'princess',
    WITCH = 'witch',
    REAPER = 'reaper',
    KRAMPUS = 'krampus',
}

export const INFO_MENU: { [key: string]: InfoMenuProps } = {
    [CHARACTER.PRINCESS]: {
        character: CHARACTER.PRINCESS,
        avatar: '/img/princess/info-menu.png',
        title: 'Lighthouse Princess',
    },
}

export enum EXPRESSION {
    HAPPINESS = 'happiness',
    ANGER = 'anger',
    SADNESS = 'sadness',
    SURPRISE = 'surprise',
    FEAR = 'fear',
}

export const DIALOG_MENU = {
    [CHARACTER.GHOST]: {
        title: 'FOREIGN GHOST',
        expressions: {
            [EXPRESSION.HAPPINESS]: '',
            [EXPRESSION.ANGER]: '',
            [EXPRESSION.SADNESS]: '',
            [EXPRESSION.SURPRISE]: '',
            [EXPRESSION.FEAR]: '',
        },
    },
    [CHARACTER.PRINCESS]: {
        title: 'LIGHTHOUSE PRINCESS',
        expressions: {
            [EXPRESSION.HAPPINESS]: '/img/princess/expression-happiness.png',
            [EXPRESSION.ANGER]: '',
            [EXPRESSION.SADNESS]: '',
            [EXPRESSION.SURPRISE]: '',
            [EXPRESSION.FEAR]: '',
        },
    },
    [CHARACTER.REAPER]: {
        title: 'TBD',
        expressions: {
            [EXPRESSION.HAPPINESS]: '',
            [EXPRESSION.ANGER]: '',
            [EXPRESSION.SADNESS]: '',
            [EXPRESSION.SURPRISE]: '',
            [EXPRESSION.FEAR]: '',
        },
    },
    [CHARACTER.WITCH]: {
        title: 'TBD',
        expressions: {
            [EXPRESSION.HAPPINESS]: '',
            [EXPRESSION.ANGER]: '',
            [EXPRESSION.SADNESS]: '',
            [EXPRESSION.SURPRISE]: '',
            [EXPRESSION.FEAR]: '',
        },
    },
    [CHARACTER.KRAMPUS]: {
        title: 'TBD',
        expressions: {
            [EXPRESSION.HAPPINESS]: '',
            [EXPRESSION.ANGER]: '',
            [EXPRESSION.SADNESS]: '',
            [EXPRESSION.SURPRISE]: '',
            [EXPRESSION.FEAR]: '',
        },
    },
}
