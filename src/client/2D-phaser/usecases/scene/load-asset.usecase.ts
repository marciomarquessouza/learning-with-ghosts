import { LoadAsset, LoadAssetAdapter } from "../../data";

export class LoadAssetUseCase implements LoadAsset {
  constructor(private loadAssetAdapter: LoadAssetAdapter) {}
  execute(asset: LoadAsset.Params): void {
    this.loadAssetAdapter.loadAsset(asset);
  }
}
