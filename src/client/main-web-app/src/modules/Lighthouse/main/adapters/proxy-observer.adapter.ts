import { Observer } from "../observers";

export class ProxyObserverHandle<T> {
  constructor(private element: string, private readonly observer: Observer) {}
  set(target: T, key: string, value: any): boolean {
    this.observer.notify({ element: this.element, key, value });
    (target as { [key: string]: any })[key] = value;
    return true;
  }
}
