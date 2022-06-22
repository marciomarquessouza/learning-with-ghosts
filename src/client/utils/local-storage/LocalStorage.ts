import { LANGUAGES } from '../../const'
import { KEY_STORAGE } from '../../const/storage'

export class LocalStorage {
    private _setData<T>(key: KEY_STORAGE, data: T) {
        const jsonData = JSON.stringify(data)
        localStorage.setItem(key, jsonData)
    }

    private _getData(key: KEY_STORAGE): string | null {
        return localStorage.getItem(key)
    }

    get chapter(): string {
        return this._getData(KEY_STORAGE.CHAPTER) || '01'
    }

    set chapter(value: string) {
        this._setData(KEY_STORAGE.CHAPTER, value)
    }

    get day(): number {
        const day = this._getData(KEY_STORAGE.DAY)
        return Number(day) || 0
    }

    set day(value: number) {
        this._setData(KEY_STORAGE.DAY, value)
    }

    get step(): number {
        const step = this._getData(KEY_STORAGE.STEP)
        return Number(step) || 0
    }

    set step(value: number) {
        this._setData(KEY_STORAGE.STEP, value)
    }

    get lives(): number {
        const lives = this._getData(KEY_STORAGE.LIVES)
        return Number(lives) || 0
    }

    set lives(value: number) {
        this._setData(KEY_STORAGE.LIVES, value)
    }

    get language(): LANGUAGES {
        const storedLanguage = this._getData(KEY_STORAGE.LANGUAGE) || LANGUAGES.ENGLISH
        return storedLanguage as LANGUAGES
    }

    set language(value: LANGUAGES) {
        this._setData(KEY_STORAGE.LANGUAGE, value)
    }
}
