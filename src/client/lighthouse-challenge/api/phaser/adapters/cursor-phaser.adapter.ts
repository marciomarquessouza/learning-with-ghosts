import { CreateCursorAdapter, GetCursorAdapter } from "../../../data";
import { Cursor } from "../../../entities";
import { cursorHelper } from "../helper";

export class CursorPhaser implements CreateCursorAdapter, GetCursorAdapter {
  create(): void {
    cursorHelper.createCursor();
  }
  get(): Cursor {
    return cursorHelper.getCursorState();
  }
}
