import { Items } from "../../entities";

export interface CreateItem {
  execute(data: Items): void;
}

export interface CreateItemAdapter {
  create(itemData: Items, createId: () => string): void;
}
