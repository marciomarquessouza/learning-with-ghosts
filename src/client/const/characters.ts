import { InfoMenuProps } from '../elements/info-menu/InfoMenu'

export enum CHARACTERS {
    GHOST = 'ghost',
    PRINCESS = 'princess',
}

export const INFO_MENU: { [key: string]: InfoMenuProps } = {
    [CHARACTERS.PRINCESS]: {
        avatar: '/img/lightning-princess/lighthouse-princess.png',
        title: 'Lighthouse Princess',
    },
}
