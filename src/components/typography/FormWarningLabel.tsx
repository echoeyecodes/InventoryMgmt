import { Colors } from "@/constants/Colors";
import { ThemedText, ThemedTextProps } from "./ThemedText";

export const FormWarningLabel = ({ style, ...props }: ThemedTextProps) => {
  return (
    <ThemedText
      fontSize={12}
      style={[
        {
          color: Colors.common.red,
        },
        style,
      ]}
      {...props}
    />
  );
};
