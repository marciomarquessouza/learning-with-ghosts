import { AddOverlap, AddOverlapAdapter } from "../../data";

export class AddOverlapUseCase implements AddOverlap {
  constructor(private addOverlapAdapter: AddOverlapAdapter) {}

  execute(overlapData: AddOverlap.Params): void {
    this.addOverlapAdapter.addOverlap(overlapData);
  }
}
