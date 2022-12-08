type StorageType = 'session' | 'local'
type UseStorageReturnValue = {
    getStorageItem: (key: string, type?: StorageType) => string
    setStorageItem: (key: string, value: string, type?: StorageType) => boolean
    removeStorageItem: (key: string, type?: StorageType) => void
}

export const useStorage = (): UseStorageReturnValue => {
    const storageType = (type?: StorageType): 'localStorage' | 'sessionStorage' =>
        `${type ?? 'session'}Storage`

    const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')()

    const getStorageItem = (key: string, type?: StorageType): string => {
        return isBrowser ? window[storageType(type)][key] : ''
    }

    const setStorageItem = (key: string, value: string, type?: StorageType): boolean => {
        if (isBrowser) {
            window[storageType(type)].setItem(key, value)
            return true
        }

        return false
    }

    const removeStorageItem = (key: string, type?: StorageType): void => {
        window[storageType(type)].removeItem(key)
    }

    return {
        getStorageItem,
        setStorageItem,
        removeStorageItem,
    }
}
