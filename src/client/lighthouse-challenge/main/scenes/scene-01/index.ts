import { preload } from "./preload";
import { create } from "./create";
import { update } from "./update";

export const scene01: Phaser.Types.Scenes.CreateSceneFromObjectConfig = {
  preload,
  create,
  update,
};
