import { Colors } from "@/constants/Colors";
import { rounded } from "@/constants/rounded";
import { spacing } from "@/constants/spacing";
import { useThemeColor } from "@/lib/hooks/colors/useThemeColor";
import { RefObject } from "react";
import {
  StyleSheet,
  TextInput as BaseTextInput,
  TextInputProps as BaseTextInputProps,
} from "react-native";

type TextInputProps = BaseTextInputProps & {
  inputRef?: RefObject<BaseTextInput>;
};

export const TextInput = ({ style, inputRef, ...props }: TextInputProps) => {
  const colors = useThemeColor();
  return (
    <BaseTextInput
      ref={inputRef}
      placeholderTextColor={colors.placeholder}
      cursorColor={Colors.common.primary}
      style={[
        styles.input,
        {
          color: colors.text,
          backgroundColor: colors.surface,
        },
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: rounded.md,
    padding: spacing.md,
  },
});
