require("phaser/src/polyfills");

var CONST = require("phaser/src/const");
var Extend = require("phaser/src/utils/object/Extend");

var Phaser = {
  // Actions: require("phaser/src/actions"),
  // Animations: require("phaser/src/animations"),
  // BlendModes: require("phaser/src/renderer/BlendModes"),
  // Cache: require("phaser/src/cache"),
  Cameras: require("phaser/src/cameras"),
  Core: require("phaser/src/core"),
  // Class: require("phaser/src/utils/Class"),
  // Create: require("phaser/src/create"),
  // Curves: require("phaser/src/curves"),
  // Data: require("phaser/src/data"),
  // Display: require("phaser/src/display"),
  // DOM: require("phaser/src/dom"),
  Events: require("phaser/src/events/index"),
  Game: require("phaser/src/core/Game"),
  GameObjects: require("phaser/src/gameobjects"),
  // Geom: require("phaser/src/geom"),
  Input: require("phaser/src/input"),
  Loader: {
    FileTypes: {
      ImageFile: require("phaser/src/loader/filetypes/ImageFile"),
      SpriteSheetFile: require("phaser/src/loader/filetypes/SpriteSheetFile"),
    },
    LoaderPlugin: require("phaser/src/loader/LoaderPlugin"),
  },
  Math: {
    FloatBetween: require("phaser/src/math/FloatBetween"),
  },
  Physics: require("phaser/src/physics"),
  // Plugins: require("phaser/src/plugins"),
  // Renderer: require("phaser/src/renderer"),
  // Scale: require("phaser/src/scale"),
  // ScaleModes: require("phaser/src/renderer/ScaleModes"),
  Scene: require("phaser/src/scene/Scene"),
  // Scenes: require("phaser/src/scene"),
  // Structs: require("phaser/src/structs"),
  // Textures: require("phaser/src/textures"),
  // Tilemaps: require("phaser/src/tilemaps"),
  // Time: require("phaser/src/time"),
  // Tweens: require("phaser/src/tweens"),
  // Utils: require("phaser/src/utils"),
};

Phaser = Extend(false, Phaser, CONST);

module.exports = Phaser;

global.Phaser = Phaser;
