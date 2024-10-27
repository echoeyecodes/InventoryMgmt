import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ViewProps,
} from "react-native";
import { ThemedText } from "../typography/ThemedText";
import { ThemedView } from "../display/ThemedView";
import { Colors } from "@/constants/Colors";
import { useMemo } from "react";
import { spacing } from "@/constants/spacing";

type ButtonProps = ViewProps & {
  borderRadius?: number;
  children?: string | React.ReactNode;
  variant?: "contained" | "outlined" | "text";
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  backgroundColor?: string;
};

export const Button = ({
  variant = "contained",
  borderRadius,
  style,
  children,
  onPress,
  disabled,
  loading,
  backgroundColor,
  ...props
}: ButtonProps) => {
  const variantStyles = useMemo(() => {
    switch (variant) {
      case "contained":
        return appliedStyles.contained;
      case "outlined":
        return appliedStyles.outlined;
      case "text":
        return appliedStyles.text;
    }
  }, [variant]);

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <ThemedView
        style={[
          styles.container,
          variantStyles.container,
          {
            borderRadius: borderRadius ?? 4,
            ...(backgroundColor && { backgroundColor }),
          },
          style,
        ]}
        {...props}
      >
        {loading ? (
          <ActivityIndicator color={Colors.common.white} size="small" />
        ) : typeof children === "string" ? (
          <ThemedText style={variantStyles.text} fontSize={12}>
            {children}
          </ThemedText>
        ) : (
          children
        )}
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: spacing.sm,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
    height: 40,
  },
});

const appliedStyles = {
  contained: StyleSheet.create({
    container: {
      backgroundColor: Colors.common.primary,
    },
    text: {
      color: Colors.common.white,
    },
  }),
  outlined: StyleSheet.create({
    container: {
      backgroundColor: Colors.common.transparent,
      borderWidth: 1,
      borderColor: Colors.common.primary,
    },
    text: {
      color: Colors.common.primary,
    },
  }),
  text: StyleSheet.create({
    container: {
      backgroundColor: Colors.common.transparent,
    },
    text: {
      color: Colors.common.primary,
    },
  }),
};
