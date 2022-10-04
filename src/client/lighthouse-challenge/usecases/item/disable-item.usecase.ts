import { DisableItemAdapter, DisableItem } from "../../data";

export class DisabeItemUseCase implements DisableItem {
  constructor(private disableItemAdapter: DisableItemAdapter) {}

  execute(itemData: DisableItem.Params): void {
    this.disableItemAdapter.disableItem(itemData);
  }
}
