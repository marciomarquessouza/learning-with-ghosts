export type ObserverData = {
  element: string;
  key: string;
  value: string | number | boolean;
};

export type SceneObserver = (data: ObserverData) => void;

export interface Observer {
  subscribe(sceneObserver: SceneObserver): void;

  unsubscribe(sceneObserver: SceneObserver): void;

  notify(data: ObserverData): void;
}
