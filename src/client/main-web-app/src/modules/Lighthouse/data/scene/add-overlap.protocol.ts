import { SceneElement } from "../../entities";

export namespace AddOverlap {
  export type Params = {
    object1: SceneElement;
    object2: SceneElement;
    callback: (obj1Name: string, obj2Name: string) => void;
  };
}

export interface AddOverlap {
  execute(overlapData: AddOverlap.Params): void;
}

export interface AddOverlapAdapter {
  addOverlap(overlapData: AddOverlap.Params): void;
}
