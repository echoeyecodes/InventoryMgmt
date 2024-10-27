import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { InventoryContextProvider } from "../../context/InventoryContextProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { AddInventory } from "../AddInventory";
import { Alert } from "react-native";
import { Inventory } from "../../models/Inventory";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

const mockedSetItem = AsyncStorage.setItem as jest.MockedFunction<
  typeof AsyncStorage.setItem
>;

const mockGoBack = jest.fn();

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useLocalSearchParams: () => ({
    id: null,
  }),
  useRouter: () => ({
    push: mockPush,
    back: mockGoBack,
  }),
}));

jest.mock("react-native", () => {
  const reactNative = jest.requireActual("react-native");
  reactNative.Alert.alert = jest.fn();
  return reactNative;
});

describe("<AddInventory />", () => {
  it("saves the inventory", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([]));
    const { getByTestId } = render(
      <NavigationContainer>
        <InventoryContextProvider>
          <AddInventory />
        </InventoryContextProvider>
      </NavigationContainer>
    );

    await waitFor(() => {
      const titleInput = getByTestId("inventory-input-title");
      const descriptionInput = getByTestId("inventory-input-description");
      const quantityInput = getByTestId("inventory-input-quantity");
      const priceInput = getByTestId("inventory-input-price");

      const submitButton = getByTestId("inventory-submit-button");

      fireEvent.changeText(titleInput, "Item 1");
      fireEvent.changeText(descriptionInput, "Test description");
      fireEvent.changeText(quantityInput, "5");
      fireEvent.changeText(priceInput, "1000");
      fireEvent.press(submitButton);

      expect(AsyncStorage.setItem).toHaveBeenCalled();
      expect(mockGoBack).toHaveBeenCalled();
    });
  });

  it("renders correctly in add mode", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([]));

    const { getByTestId } = render(
      <NavigationContainer>
        <InventoryContextProvider>
          <AddInventory />
        </InventoryContextProvider>
      </NavigationContainer>
    );

    await waitFor(() => {
      const titleInput = getByTestId("inventory-input-title");
      const descriptionInput = getByTestId("inventory-input-description");
      const quantityInput = getByTestId("inventory-input-quantity");
      const priceInput = getByTestId("inventory-input-price");
      const submitButton = getByTestId("inventory-submit-button");

      expect(titleInput).toBeTruthy();
      expect(descriptionInput).toBeTruthy();
      expect(quantityInput).toBeTruthy();
      expect(priceInput).toBeTruthy();
      expect(submitButton).toBeTruthy();
    });
  });

  it("renders correctly in edit mode", async () => {
    const data: Inventory = {
      id: "1",
      title: "Item 1",
      description: "Test description",
      quantity: 5,
      price: 1000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify([data])
    );

    const { getByTestId, getByText } = render(
      <NavigationContainer>
        <InventoryContextProvider>
          <AddInventory data={data} />
        </InventoryContextProvider>
      </NavigationContainer>
    );

    await waitFor(() => {
      const titleInput = getByTestId("inventory-input-title");
      const descriptionInput = getByTestId("inventory-input-description");
      const quantityInput = getByTestId("inventory-input-quantity");
      const priceInput = getByTestId("inventory-input-price");

      const deleteButton = getByTestId("inventory-delete-button");

      expect(titleInput).toBeTruthy();
      expect(titleInput.props.value).toBe("Item 1");
      expect(descriptionInput).toBeTruthy();
      expect(descriptionInput.props.value).toBe("Test description");
      expect(quantityInput).toBeTruthy();
      expect(quantityInput.props.value).toBe("5");
      expect(priceInput).toBeTruthy();
      expect(priceInput.props.value).toBe("1000");
      expect(getByText("Update Inventory")).toBeTruthy();
      expect(deleteButton).toBeTruthy();
    });
  });

  it("updates the inventory", async () => {
    const inventory: Inventory = {
      id: "112",
      title: "Item 1",
      description: "Test description",
      quantity: 5,
      price: 1000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify([inventory])
    );
    const { getByTestId } = render(
      <NavigationContainer>
        <InventoryContextProvider>
          <AddInventory data={inventory} />
        </InventoryContextProvider>
      </NavigationContainer>
    );

    await waitFor(() => {
      const quantityInput = getByTestId("inventory-input-quantity");
      const priceInput = getByTestId("inventory-input-price");

      const submitButton = getByTestId("inventory-submit-button");

      expect(quantityInput).toBeTruthy();
      expect(priceInput).toBeTruthy();

      fireEvent.changeText(quantityInput, "10");
      fireEvent.changeText(priceInput, "2000");
      fireEvent.press(submitButton);

      const [_, value] = mockedSetItem.mock.calls[3];

      const storedData = JSON.parse(value);

      expect(storedData).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            quantity: 10,
            price: 2000,
          }),
        ])
      );
      expect(mockGoBack).toHaveBeenCalled();
    });
  });

  it("shows the delete alert dialog when delete button is pressed", async () => {
    const data: Inventory = {
      id: "1",
      title: "Item 1",
      description: "Test description",
      quantity: 5,
      price: 1000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify([data])
    );

    const { getByTestId } = render(
      <NavigationContainer>
        <InventoryContextProvider>
          <AddInventory data={data} />
        </InventoryContextProvider>
      </NavigationContainer>
    );

    await waitFor(() => {
      const deleteButton = getByTestId("inventory-delete-button");
      fireEvent.press(deleteButton);

      expect(Alert.alert).toHaveBeenCalled();
    });
  });

  it("matches snapshot in add mode", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([]));

    const { toJSON } = render(
      <NavigationContainer>
        <InventoryContextProvider>
          <AddInventory />
        </InventoryContextProvider>
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it("matches snapshot in edit mode", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify([
        {
          id: "1",
          title: "Item 1",
          description: "Test description",
          quantity: 5,
          price: 1000,
        },
      ])
    );

    const { toJSON } = render(
      <NavigationContainer>
        <InventoryContextProvider>
          <AddInventory />
        </InventoryContextProvider>
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
