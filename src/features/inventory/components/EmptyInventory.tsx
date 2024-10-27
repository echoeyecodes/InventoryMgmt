import { ThemedText } from "@/components/typography/ThemedText";
import { useTranslation } from "@/lib/i18n";
import { StyleSheet, View } from "react-native";

export const EmptyInventory = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <ThemedText testID="empty-inventory-text">
        {t("inventory.empty_inventory")}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
