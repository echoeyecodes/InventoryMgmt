import { StyleSheet, Text, type TextProps } from "react-native";

import { useThemeColor } from "@/lib/hooks/colors/useThemeColor";

export type TextVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "default";

export type ThemedTextProps = TextProps & {
  color?: string;
  fontSize?: number;
  variant?: TextVariant;
  fontWeight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
};

export function ThemedText({
  style,
  variant = "default",
  color,
  fontSize,
  fontWeight,
  ...rest
}: ThemedTextProps) {
  const themedTextColor = useThemeColor().text;

  return (
    <Text
      style={[
        { color: themedTextColor },
        styles[variant],
        {
          fontSize: fontSize ?? styles[variant].fontSize,
          color: color ?? themedTextColor,
          fontWeight: fontWeight ?? styles[variant].fontWeight,
        },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 15,
    fontWeight: "normal",
  },
  h1: {
    fontSize: 32,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 28,
    fontWeight: "bold",
  },
  h3: {
    fontSize: 24,
    fontWeight: "600",
  },
  h4: {
    fontSize: 20,
    fontWeight: "600",
  },
  h5: {
    fontSize: 18,
    fontWeight: "600",
  },
  h6: {
    fontSize: 16,
    fontWeight: "600",
  },
});
