import { CreateCursor, CreateCursorAdapter } from "../../data/cursor";

export class CreateCursorUseCase implements CreateCursor {
  constructor(private createCursorAdapter: CreateCursorAdapter) {}

  execute(): void {
    this.createCursorAdapter.create();
  }
}
