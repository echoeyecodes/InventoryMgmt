import { DefaultLayout } from "@/components/display/DefaultLayout";
import {
  ThemedText,
  ThemedTextProps,
} from "@/components/typography/ThemedText";
import { spacing } from "@/constants/spacing";
import { Alert, StyleSheet, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Button, IconButton } from "@/components/button";
import { useRouter } from "expo-router";
import { Divider } from "@/components/Divider";
import { TextInput } from "@/components/input/TextInput";
import { ScrollView } from "@/components/list/ScrollView";
import { useTranslation } from "@/lib/i18n";
import { z } from "zod";
import useFormWithValidator from "@/lib/react-form/useForm";
import { Controller } from "react-hook-form";
import { FormWarningLabel } from "@/components/typography/FormWarningLabel";
import { useThemeColor } from "@/lib/hooks/colors/useThemeColor";
import { useInventoryContext } from "../context/useInventoryContext";
import { Inventory } from "../models/Inventory";

const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(3),
  quantity: z.coerce.number().int().positive().min(1),
  price: z.coerce.number().int().positive().min(100),
});

const FormTitle = (props: ThemedTextProps) => {
  return <ThemedText variant="h6" fontSize={14} {...props} />;
};

export const AddInventory = ({ data }: { data?: Inventory }) => {
  const {
    addInventory,
    updateInventory,
    removeInventory,
    getInventoryByTitle,
  } = useInventoryContext();
  const router = useRouter();
  const form = useFormWithValidator<z.infer<typeof schema>>({
    schema,
    defaultValues: {
      title: data?.title ?? "",
      description: data?.description ?? "",
      quantity: data?.quantity ?? 1,
      price: data?.price ?? 1,
    },
  });
  const colors = useThemeColor();
  const { t } = useTranslation();

  const onSubmit = (newData: z.infer<typeof schema>) => {
    if (!isEditMode) {
      const isNameUnique = !getInventoryByTitle(newData.title);
      if (!isNameUnique) {
        return form.setError("title", {
          message: t("inventory.inventory_exists"),
        });
      }
      addInventory({
        title: newData.title,
        description: newData.description,
        quantity: newData.quantity,
        price: newData.price,
      });
    } else {
      if (data) {
        updateInventory({
          id: data.id,
          data: {
            title: newData.title,
            description: newData.description,
            quantity: newData.quantity,
            price: newData.price,
          },
        });
      }
    }
    router.back();
  };

  const handleDeleteInventory = () => {
    if (data) {
      Alert.alert(t("common.delete"), t("inventory.delete_confirm"), [
        {
          text: t("common.cancel"),
          style: "cancel",
        },
        {
          text: t("common.delete"),
          onPress: () => {
            removeInventory(data.id);
            router.back();
          },
        },
      ]);
    }
  };

  const isEditMode = !!data;

  return (
    <DefaultLayout style={styles.container}>
      <View style={styles.header}>
        <IconButton onPress={router.back}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </IconButton>
        <ThemedText variant="h5" testID="add-inventory-title">
          {isEditMode
            ? t("inventory.update_inventory")
            : t("inventory.add_inventory")}
        </ThemedText>
      </View>

      <Divider />

      <ScrollView
        style={styles.form}
        contentContainerStyle={styles.formContent}
      >
        <View style={styles.formItem}>
          <FormTitle>{t("inventory.inventory_input_title")}</FormTitle>
          <Controller
            control={form.control}
            name="title"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder={t("inventory.inventory_input_title_placeholder")}
                onChangeText={onChange}
                testID="inventory-input-title"
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {form.formState.errors.title && (
            <FormWarningLabel>
              {form.formState.errors.title.message}
            </FormWarningLabel>
          )}
        </View>

        <View style={styles.formItem}>
          <FormTitle>{t("inventory.inventory_input_description")}</FormTitle>
          <Controller
            control={form.control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder={t(
                  "inventory.inventory_input_description_placeholder"
                )}
                onChangeText={onChange}
                onBlur={onBlur}
                testID="inventory-input-description"
                value={value}
              />
            )}
          />
          {form.formState.errors.description && (
            <FormWarningLabel>
              {form.formState.errors.description.message}
            </FormWarningLabel>
          )}
        </View>

        <View style={styles.formItem}>
          <FormTitle>{t("inventory.inventory_input_quantity")}</FormTitle>
          <Controller
            control={form.control}
            name="quantity"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder={t(
                  "inventory.inventory_input_quantity_placeholder"
                )}
                onChangeText={onChange}
                testID="inventory-input-quantity"
                onBlur={onBlur}
                keyboardType="numeric"
                value={value.toString()}
              />
            )}
          />
          {form.formState.errors.quantity && (
            <FormWarningLabel>
              {form.formState.errors.quantity.message}
            </FormWarningLabel>
          )}
        </View>

        <View style={styles.formItem}>
          <FormTitle>{t("inventory.inventory_input_price")}</FormTitle>
          <Controller
            control={form.control}
            name="price"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder={t("inventory.inventory_input_price_placeholder")}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="numeric"
                value={value.toString()}
                testID="inventory-input-price"
              />
            )}
          />
          {form.formState.errors.price && (
            <FormWarningLabel>
              {form.formState.errors.price.message}
            </FormWarningLabel>
          )}
        </View>

        <Button
          testID="inventory-submit-button"
          onPress={form.handleSubmit(onSubmit)}
        >
          {isEditMode ? t("common.update") : t("common.save")}
        </Button>

        {isEditMode && (
          <Button
            testID="inventory-delete-button"
            variant="text"
            onPress={handleDeleteInventory}
          >
            {t("common.delete")}
          </Button>
        )}
      </ScrollView>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  form: {
    flex: 1,
  },
  formContent: {
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  formItem: {
    gap: spacing.xs,
  },
});
