import {
  AddColliderAdapter,
  AddOverlapAdapter,
  LoadAssetAdapter,
  AddCollider,
  AddOverlap,
  LoadAsset,
} from "../../../data";
import { ItemElement, sceneHelper } from "../helper";

export class ScenePhaser
  implements AddColliderAdapter, LoadAssetAdapter, AddOverlapAdapter
{
  add(colliders: AddCollider.Params): void {
    const { object1, object2 } = colliders;
    sceneHelper.addColliders(object1, object2);
  }

  loadAsset(asset: LoadAsset.Params): void {
    const { name, path, frame } = asset;

    if (frame) {
      const { frameHeight, frameWidth } = frame;
      sceneHelper.loadSpriteSheet(name, path, frameWidth, frameHeight);
    } else {
      sceneHelper.loadImage(name, path);
    }
  }

  addOverlap(overlapData: AddOverlap.Params): void {
    const { object1, object2, callback } = overlapData;
    const callbackPhaser = (
      { name: obj1Name }: ItemElement,
      { name: obj2Name }: ItemElement
    ) => {
      callback(obj1Name, obj2Name);
    };
    sceneHelper.addOverlap(object1, object2, callbackPhaser);
  }
}
