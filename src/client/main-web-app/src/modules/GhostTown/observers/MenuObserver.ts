import {
    DialogMenuContext,
    dialogMenuDefault,
    InfoMenuContext,
    infoMenuDefault,
} from 'modules/GhostTown/contexts/GhostTownGUIContext/Context'

export interface Observer {
    updateInfoMenu(infoMenu: InfoMenuContext): void
    updateDialogMenu(dialogMenu: DialogMenuContext): void
}

class MenuObserver implements Observer {
    constructor(public readonly name: string) {}

    private infoMenu: InfoMenuContext = { ...infoMenuDefault, isOpen: false }
    private dialogMenu: DialogMenuContext = { ...dialogMenuDefault, isOpen: false }

    updateInfoMenu(infoMenu: InfoMenuContext): void {
        this.infoMenu = infoMenu
    }

    updateDialogMenu(dialogMenu: DialogMenuContext): void {
        this.dialogMenu = dialogMenu
    }

    getInfoMenuState() {
        return this.infoMenu
    }

    getDialogMenu() {
        return this.dialogMenu
    }
}

export default MenuObserver
