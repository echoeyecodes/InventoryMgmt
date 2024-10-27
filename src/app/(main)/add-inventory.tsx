import { AddInventory } from "@/features/inventory/components/AddInventory";
import { useInventoryContext } from "@/features/inventory/context/useInventoryContext";
import { useLocalSearchParams } from "expo-router";

export default function AddInventoryPage() {
  const { id } = useLocalSearchParams();
  const { getInventory } = useInventoryContext();
  const inventory = getInventory(id as string);

  return <AddInventory data={inventory} />;
}
