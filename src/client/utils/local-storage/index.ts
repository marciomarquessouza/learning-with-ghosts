import { LocalStorage } from './LocalStorage'

function createStorage() {
    return new LocalStorage()
}

export { LocalStorage, createStorage }
