import { DialogMenuProps, InfoMenuProps } from '../components'
import MenuObserver from './MenuObserver'

export interface Subject {
    subscribe(observer: MenuObserver): void
    unsubscribe(observer: MenuObserver): void
    notifyDialogMenu(dialogMenu: DialogMenuProps, isOpen: boolean): void
    notifyInfoMenu(infoMenu: InfoMenuProps, isOpen: boolean): void
}

class MenuSubject implements Subject {
    private observers: MenuObserver[] = []

    subscribe(observer: MenuObserver): void {
        this.observers.push(observer)
    }

    unsubscribe(observer: MenuObserver): void {
        this.observers = this.observers.filter(({ name }) => name !== observer.name)
    }

    notifyDialogMenu(dialogMenu: DialogMenuProps, isOpen: boolean): void {
        this.observers.forEach((observer) => observer.updateDialogMenu(dialogMenu, isOpen))
    }

    notifyInfoMenu(infoMenu: InfoMenuProps, isOpen: boolean): void {
        this.observers.forEach((observer) => observer.updateInfoMenu(infoMenu, isOpen))
    }
}

export default MenuSubject
