import { ItemPhaser } from "../../../api/phaser/adapters";
import { DisabeItemUseCase } from "../../../usecases";

export const makeDisableItem = () => {
  const disableItemAdapter = new ItemPhaser();
  return new DisabeItemUseCase(disableItemAdapter);
};
