import {
  DisableItem,
  CreateItemAdapter,
  DisableItemAdapter,
} from "../../../data";
import { Items } from "../../../entities";
import { itemHelper } from "../helper";

export class ItemPhaser implements CreateItemAdapter, DisableItemAdapter {
  create(items: Items, createId: () => string): void {
    itemHelper.createItems(items, createId);
  }

  disableItem(items: DisableItem.Params): void {
    const { groupName, itemName } = items;
    itemHelper.disableItem(groupName, itemName);
  }
}
