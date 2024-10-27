import { ScrollView as BaseScrollView, ScrollViewProps } from "react-native";

export const ScrollView = (props: ScrollViewProps) => {
  return (
    <BaseScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      {...props}
    />
  );
};
