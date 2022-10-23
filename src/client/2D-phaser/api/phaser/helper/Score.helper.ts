import { sceneHelper } from "./Scene.helper";
import { scorePhaser } from "../phaser-elements.cache";

class ScoreHelper {
  createScore(
    x: number,
    y: number,
    text: string,
    style?: Phaser.Types.GameObjects.Text.TextStyle
  ) {
    const scene = sceneHelper.getScene();
    const createdScore = scene.add.text(x, y, text, style);
    scorePhaser.set("score", createdScore);
  }

  updateScore(text: string) {
    scorePhaser.get("score").setText(text);
  }
}

export const scoreHelper = new ScoreHelper();
