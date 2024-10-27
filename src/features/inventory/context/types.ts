import { Inventory } from "../models/Inventory";

export type AddInventoryParams = Omit<
  Inventory,
  "id" | "createdAt" | "updatedAt"
>;
export type UpdateInventoryParams = {
  id: string;
  data: Omit<Partial<Inventory>, "createdAt" | "updatedAt">;
};

export type InventoryContextType = {
  data: Inventory[];
  addInventory: (inventory: AddInventoryParams) => void;
  updateInventory: (inventory: UpdateInventoryParams) => void;
  removeInventory: (id: string) => void;
  getInventory: (id: string) => Inventory | undefined;
  getInventoryByTitle: (title: string) => Inventory | undefined;
};
