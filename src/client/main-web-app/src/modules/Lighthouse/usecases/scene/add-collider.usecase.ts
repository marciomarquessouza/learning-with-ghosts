import { AddCollider, AddColliderAdapter } from "../../data";

export class AddColliderUseCase implements AddCollider {
  constructor(private addColliderAdapter: AddColliderAdapter) {}

  execute(collidersElements: AddCollider.Params): void {
    this.addColliderAdapter.add(collidersElements);
  }
}
