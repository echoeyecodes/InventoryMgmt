import { useContext } from "react";
import { InventoryContext } from "./InventoryContext";

export const useInventoryContext = () => {
  return useContext(InventoryContext);
};
