import { GetCursorAdapter, GetCursorState } from "../../data";
import { Cursor } from "../../entities";

export class GetCursorStateUseCase implements GetCursorState {
  constructor(private getCursorAdapter: GetCursorAdapter) {}
  execute(): Cursor {
    return this.getCursorAdapter.get();
  }
}
