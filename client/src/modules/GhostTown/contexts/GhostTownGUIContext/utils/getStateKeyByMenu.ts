import { MENUS } from 'types/GhostTownGui'

export default function getStateKeyByMenu(menu: MENUS): string {
    switch (menu) {
        case MENUS.CHAPTER_TITLE:
            return 'isChapterTitleOpen'
        case MENUS.DIALOG_MENU:
            return 'isDialogMenuOpen'
        case MENUS.INFO_MENU:
            return 'isInfoMenuOpen'
        case MENUS.LIVE_MENU:
            return 'isLiveMenuOpen'
        case MENUS.MAIN_MENU:
            return 'isMainMenuOpen'
        default:
            return ''
    }
}
