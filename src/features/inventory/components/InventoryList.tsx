import { IconButton } from "@/components/button";
import { DefaultLayout } from "@/components/display/DefaultLayout";
import { ThemedText } from "@/components/typography/ThemedText";
import {
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Divider } from "@/components/Divider";
import { InventoryItem } from "@/features/inventory/components/InventoryItem";
import { FlatList } from "@/components/list/FlatList";
import { useCallback } from "react";
import { Inventory } from "@/features/inventory/models/Inventory";
import { spacing } from "@/constants/spacing";
import { useInventoryContext } from "@/features/inventory/context/useInventoryContext";
import { useTranslation } from "@/lib/i18n";
import { EmptyInventory } from "@/features/inventory/components/EmptyInventory";
import { useThemeColor } from "@/lib/hooks/colors/useThemeColor";
import { useRouter } from "expo-router";

export default function InventoryList() {
  const router = useRouter();
  const colors = useThemeColor();
  const { data } = useInventoryContext();
  const { t } = useTranslation();

  const onInventoryPress = (id: string) => {
    router.push(`/add-inventory?id=${id}`);
  };

  const renderItem: ListRenderItem<Inventory> = useCallback(
    ({ item }) => (
      <TouchableOpacity
        onPress={() => onInventoryPress(item.id)}
        testID={`inventory-item`}
      >
        <InventoryItem data={item} />
      </TouchableOpacity>
    ),
    []
  );

  const navigateToAddInventory = () => {
    router.push("/add-inventory");
  };

  return (
    <DefaultLayout style={styles.container} testID="inventory-list">
      <View style={styles.header}>
        <ThemedText variant="h1">{t("common.home")}</ThemedText>
        <IconButton
          onPress={navigateToAddInventory}
          testID="add-inventory-button"
        >
          <AntDesign name="pluscircle" size={24} color={colors.text} />
        </IconButton>
      </View>

      <Divider />

      <FlatList
        data={data}
        renderItem={renderItem}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
        ListEmptyComponent={<EmptyInventory />}
      />
    </DefaultLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flatList: {
    flex: 1,
    paddingVertical: spacing.md,
  },
  flatListContent: {
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
});
