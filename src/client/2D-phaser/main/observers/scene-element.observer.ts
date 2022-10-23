import { Observer, ObserverData, SceneObserver } from "./observer.protocol";

export class SceneElementObserver implements Observer {
  constructor(private observers: SceneObserver[] = []) {}

  subscribe(sceneObserver: SceneObserver): void {
    this.observers.push(sceneObserver);
  }

  unsubscribe(sceneObserver: SceneObserver): void {
    this.observers.filter((observer) => observer !== sceneObserver);
  }

  notify(data: ObserverData): void {
    this.observers.map((observer) => observer(data));
  }
}
