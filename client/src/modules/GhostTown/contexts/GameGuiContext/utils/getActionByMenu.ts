import { ACTIONS, GameGuiActions, MENUS, MenusProps } from 'types/GameGui'

export default function getActionByMenu({ menu, value }: MenusProps): GameGuiActions {
    switch (menu) {
        case MENUS.CHAPTER_TITLE:
            return { type: ACTIONS.OPEN_CHAPTER_TITLE, value }
        case MENUS.DIALOG_MENU:
            return { type: ACTIONS.OPEN_DIALOG_MENU, value }
        case MENUS.INFO_MENU:
            return { type: ACTIONS.OPEN_INFO_MENU, value }
        case MENUS.LIVE_MENU:
            return { type: ACTIONS.OPEN_LIVE_MENU, value }
        case MENUS.MAIN_MENU:
            return { type: ACTIONS.OPEN_MAIN_MENU }
        case MENUS.CHALLENGE_MENU:
            return { type: ACTIONS.OPEN_CHALLENGE_MENU, value }
    }
}
