import {
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { InventoryContext } from "./InventoryContext";
import { Inventory } from "../models/Inventory";
import storage from "@/lib/storage";
import { AddInventoryParams, UpdateInventoryParams } from "./types";
import { ActivityIndicator } from "react-native";

const INVENTORY_KEY = "inventory_db";

export const InventoryContextProvider = (props: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Inventory[]>([]);

  const addInventory = (inventory: AddInventoryParams) => {
    const now = new Date().toISOString();
    const newData: Inventory[] = [
      ...data,
      {
        id: now,
        createdAt: now,
        updatedAt: now,
        ...inventory,
      },
    ];
    setData(newData);
    storage.setItem(INVENTORY_KEY, JSON.stringify(newData));
  };

  const removeInventory = (id: string) => {
    const newData = data.filter((inventory) => inventory.id !== id);
    setData(newData);
    storage.setItem(INVENTORY_KEY, JSON.stringify(newData));
  };

  const updateInventory = (inventory: UpdateInventoryParams) => {
    const now = new Date().toISOString();
    const newData = data.map((item) =>
      item.id === inventory.id
        ? { ...item, ...inventory.data, updatedAt: now }
        : item
    );
    setData(newData);
    storage.setItem(INVENTORY_KEY, JSON.stringify(newData));
  };

  const getInventory = (id: string) => {
    return data.find((inventory) => inventory.id === id);
  };

  const getInventoryByTitle = (title: string) => {
    return data.find(
      (inventory) =>
        inventory.title.trim().toLowerCase() === title.trim().toLowerCase()
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await storage.getItem(INVENTORY_KEY);
      setData(data ? JSON.parse(data) : []);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const sortedData = useMemo(() => {
    const sortedData = data.sort((a: Inventory, b: Inventory) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return sortedData;
  }, [data]);

  return (
    <InventoryContext.Provider
      value={{
        data: sortedData,
        getInventoryByTitle,
        addInventory,
        updateInventory,
        removeInventory,
        getInventory,
      }}
    >
      {isLoading ? <ActivityIndicator /> : props.children}
    </InventoryContext.Provider>
  );
};
