import { ItemPhaser } from "../../../api/phaser/adapters";
import { UniqueIdentifierUUID } from "../../../api/uuid";
import { CreateItemUseCase } from "../../../usecases";

export const makeCreateItem = () => {
  const createItemAdapter = new ItemPhaser();
  const createIdAdapter = new UniqueIdentifierUUID();
  return new CreateItemUseCase(createItemAdapter, createIdAdapter);
};
