import {
    DialogMenuContext,
    InfoMenuContext,
} from 'contexts/GhostTownGUIContext/GhostTownGUIContext'
import MenuObserver from './MenuObserver'

export interface Subject {
    subscribe(observer: MenuObserver): void
    unsubscribe(observer: MenuObserver): void
    notifyDialogMenu(dialogMenu: DialogMenuContext): void
    notifyInfoMenu(infoMenu: InfoMenuContext): void
}

class MenuSubject implements Subject {
    private observers: MenuObserver[] = []

    subscribe(observer: MenuObserver): void {
        this.observers.push(observer)
    }

    unsubscribe(observer: MenuObserver): void {
        this.observers = this.observers.filter(({ name }) => name !== observer.name)
    }

    notifyDialogMenu(dialogMenu: DialogMenuContext): void {
        this.observers.forEach((observer) => observer.updateDialogMenu(dialogMenu))
    }

    notifyInfoMenu(infoMenu: InfoMenuContext): void {
        this.observers.forEach((observer) => observer.updateInfoMenu(infoMenu))
    }
}

export default MenuSubject
