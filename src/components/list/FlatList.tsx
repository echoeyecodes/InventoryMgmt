import { FlatList as BaseFlatList, FlatListProps } from "react-native";

export const FlatList = <T,>(props: FlatListProps<T>) => {
  return (
    <BaseFlatList
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      {...props}
    />
  );
};
