import { DialogMenuProps, InfoMenuProps } from '../components'
import {
    dialogMenuDefault,
    infoMenuDefault,
} from '../contexts/GhostTownGUIContext/reducers/ghostTownGuiInitialState'

export interface Observer {
    updateInfoMenu(infoMenu: InfoMenuProps, isOpen: boolean): void
    updateDialogMenu(dialogMenu: DialogMenuProps, isOpen: boolean): void
}

class MenuObserver implements Observer {
    constructor(public readonly name: string) {}

    private infoMenu = { ...infoMenuDefault, isOpen: false }
    private dialogMenu = { ...dialogMenuDefault, isOpen: false }

    updateInfoMenu(infoMenu: InfoMenuProps, isOpen: boolean): void {
        this.infoMenu = { ...infoMenu, isOpen }
    }

    updateDialogMenu(dialogMenu: DialogMenuProps, isOpen: boolean): void {
        this.dialogMenu = { ...dialogMenu, isOpen }
    }

    getInfoMenuState() {
        return this.infoMenu
    }

    getDialogMenu() {
        return this.dialogMenu
    }
}

export default MenuObserver
