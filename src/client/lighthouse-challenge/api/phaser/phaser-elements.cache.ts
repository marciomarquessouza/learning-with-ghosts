import { CacheElements } from "../../main";

type PlayerPhaserElement = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
export const playerPhaser = new CacheElements<PlayerPhaserElement>();

type ScenarioPhaserElement = Phaser.Physics.Arcade.StaticGroup;
export const scenarioPhaser = new CacheElements<ScenarioPhaserElement>();

type ItemsPhaserElement = Phaser.Physics.Arcade.Group;
export const itemsPhaser = new CacheElements<ItemsPhaserElement>();

type CursorPhaserElement = Phaser.Types.Input.Keyboard.CursorKeys;
export const cursorPhaser = new CacheElements<CursorPhaserElement>();

type ScorePhaserElement = Phaser.GameObjects.Text;
export const scorePhaser = new CacheElements<ScorePhaserElement>();
