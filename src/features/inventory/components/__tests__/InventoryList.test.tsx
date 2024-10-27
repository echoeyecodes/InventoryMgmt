import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { InventoryContextProvider } from "../../context/InventoryContextProvider";
import InventoryList from "../InventoryList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

const mockPush = jest.fn();
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("<InventoryList />", () => {
  it("matches snapshot", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([]));

    const { toJSON } = render(
      <NavigationContainer>
        <InventoryContextProvider>
          <InventoryList />
        </InventoryContextProvider>
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it("renders correctly", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([]));

    const { getByTestId, getByText } = render(
      <NavigationContainer>
        <InventoryContextProvider>
          <InventoryList />
        </InventoryContextProvider>
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByTestId("inventory-list")).toBeTruthy();
      expect(getByText("Home")).toBeTruthy();
      expect(getByTestId("add-inventory-button")).toBeTruthy();
      expect(getByTestId("empty-inventory-text")).toBeTruthy();
    });
  });

  it("navigates to AddInventory screen when add button is clicked", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([]));

    const { getByTestId } = render(
      <NavigationContainer>
        <InventoryContextProvider>
          <InventoryList />
        </InventoryContextProvider>
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByTestId("add-inventory-button")).toBeTruthy();
    });

    const addButton = getByTestId("add-inventory-button");
    fireEvent.press(addButton);

    expect(mockPush).toHaveBeenCalledWith("/add-inventory");
  });

  it("shows all inventory items", async () => {
    const mockInventoryItems = [
      { id: "1", title: "Item 1", quantity: 5 },
      { id: "2", title: "Item 2", quantity: 10 },
    ];
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify(mockInventoryItems)
    );

    const { getAllByTestId } = render(
      <NavigationContainer>
        <InventoryContextProvider>
          <InventoryList />
        </InventoryContextProvider>
      </NavigationContainer>
    );

    await waitFor(() => {
      const inventoryItems = getAllByTestId("inventory-item");
      expect(inventoryItems.length).toBe(2);
    });
  });

  it("navigates to AddInventory screen with id when an inventory item is tapped", async () => {
    const mockInventoryItems = [
      { id: "1", title: "Item 1", quantity: 5 },
      { id: "2", title: "Item 2", quantity: 10 },
    ];
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify(mockInventoryItems)
    );

    const { getAllByTestId } = render(
      <NavigationContainer>
        <InventoryContextProvider>
          <InventoryList />
        </InventoryContextProvider>
      </NavigationContainer>
    );

    await waitFor(() => {
      const inventoryItem = getAllByTestId("inventory-item");
      fireEvent.press(inventoryItem[0]);
    });

    expect(mockPush).toHaveBeenCalledWith("/add-inventory?id=1");
  });
});
