import { CursorPhaser } from "../../../api/phaser/adapters";
import { CreateCursorUseCase } from "../../../usecases";

export const makeCreateCursor = () => {
  const createCursorAdapter = new CursorPhaser();
  const createCursor = new CreateCursorUseCase(createCursorAdapter);
  return createCursor;
};
