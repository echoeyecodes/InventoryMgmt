import { createContext } from "react";
import { InventoryContextType } from "./types";

export const InventoryContext = createContext<InventoryContextType>({
  data: [],
  addInventory: () => {},
  updateInventory: () => {},
  removeInventory: () => {},
  getInventory: () => undefined,
  getInventoryByTitle: () => undefined,
});
