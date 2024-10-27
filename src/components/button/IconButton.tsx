import { rounded } from "@/constants/rounded";
import React, { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, View, ViewProps } from "react-native";

export type IconButtonProps = ViewProps & {
  children: ReactNode;
  disabled?: boolean;
  onPress?: () => void;
};

export const IconButton = ({
  children,
  disabled,
  onPress,
  style,
  ...props
}: IconButtonProps) => {
  function onButtonPressed() {
    onPress?.();
  }
  return (
    <TouchableOpacity disabled={disabled} onPress={onButtonPressed}>
      <View
        style={[styles.container, { opacity: disabled ? 0.5 : 1 }, style]}
        {...props}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: rounded.full,
  },
});
