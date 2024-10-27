import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/lib/hooks/colors/useThemeColor";

export function ThemedView({ style, ...otherProps }: ViewProps) {
  const backgroundColor = useThemeColor().background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
