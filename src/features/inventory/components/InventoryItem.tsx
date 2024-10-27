import { ThemedText } from "@/components/typography/ThemedText";
import { useThemeColor } from "@/lib/hooks/colors/useThemeColor";
import { StyleSheet, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Inventory } from "../models/Inventory";
import { spacing } from "@/constants/spacing";
import { rounded } from "@/constants/rounded";

type InventoryItemProps = {
  data: Inventory;
};

export const InventoryItem = ({ data }: InventoryItemProps) => {
  const colors = useThemeColor();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.group,
        },
      ]}
    >
      <View>
        <ThemedText variant="h5">{data.title}</ThemedText>
        <ThemedText color={colors.subtitle}>{data.description}</ThemedText>
      </View>

      <View style={styles.desc}>
        <View style={styles.descItem}>
          <Feather name="dollar-sign" size={12} color={colors.text} />
          <ThemedText color={colors.subtitle}>{data.price}</ThemedText>
        </View>
        <View style={styles.descItem}>
          <Feather name="hash" size={12} color={colors.text} />
          <ThemedText color={colors.subtitle}>{data.quantity}</ThemedText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    gap: spacing.md,
    borderRadius: rounded.lg,
  },
  desc: {
    gap: spacing.xs,
  },
  descItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
});
