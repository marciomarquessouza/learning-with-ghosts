import { CursorPhaser } from "../../../api/phaser/adapters";
import { GetCursorStateUseCase } from "../../../usecases";

export const makeGetCursorState = () => {
  const getCursorAdapter = new CursorPhaser();
  const getCursorState = new GetCursorStateUseCase(getCursorAdapter);
  return getCursorState;
};
