export function getPhaser(
  config: Phaser.Types.Core.GameConfig
): Promise<Phaser.Game> {
  return import("./phaser-custom.js").then(({ default: Phaser }) => {
    return new Phaser.Game(config);
  });
}
