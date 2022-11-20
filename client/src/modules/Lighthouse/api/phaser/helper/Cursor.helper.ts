import { Cursor } from "../../../entities";
import { sceneHelper } from "./Scene.helper";
import { cursorPhaser } from "../phaser-elements.cache";

class CursorHelper {
  createCursor() {
    const scene = sceneHelper.getScene();
    const createdCursor = scene.input.keyboard.createCursorKeys();
    cursorPhaser.set("cursor", createdCursor);
  }

  getCursorState(): Cursor {
    const cursor = cursorPhaser.get("cursor");
    return {
      left: { ...cursor.left },
      right: { ...cursor.right },
      up: { ...cursor.up },
      down: { ...cursor.down },
    };
  }
}

export const cursorHelper = new CursorHelper();
