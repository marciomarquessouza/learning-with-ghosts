import { CreateIDAdapter, CreateItem, CreateItemAdapter } from "../../data";
import { Items } from "../../entities";

export class CreateItemUseCase implements CreateItem {
  constructor(
    private readonly createItemAdapter: CreateItemAdapter,
    private readonly createIdAdapter: CreateIDAdapter
  ) {}

  execute(data: Items): void {
    this.createItemAdapter.create(data, this.createIdAdapter.create);
  }
}
