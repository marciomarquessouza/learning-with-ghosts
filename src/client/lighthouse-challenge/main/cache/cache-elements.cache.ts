export class CacheElements<T> {
    protected cacheMap: Map<string, T>

    constructor() {
        this.cacheMap = new Map()
    }

    set(key: string, value: T): void {
        this.cacheMap.set(key, value)
    }
    get(key: string): T {
        // @ts-ignore
        return this.cacheMap.get(key)
    }
    del(key: string): void {
        this.cacheMap.delete(key)
    }
    has(key: string): boolean {
        return this.cacheMap.has(key)
    }
    itemCount(): number {
        return this.cacheMap.size
    }
    keys(): string[] {
        return Array.from(this.cacheMap.keys())
    }
    clear(): void {
        this.cacheMap.clear()
    }
}
