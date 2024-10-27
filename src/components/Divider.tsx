import { useThemeColor } from "@/lib/hooks/colors/useThemeColor";
import React from "react";
import { View, ViewStyle } from "react-native";

type DividerProps = {
  containerStyle?: ViewStyle;
};

export const Divider = (props: DividerProps) => {
  const colors = useThemeColor();

  return (
    <View
      style={[
        { borderTopWidth: 0.5, borderTopColor: colors.border },
        props.containerStyle,
      ]}
    />
  );
};
