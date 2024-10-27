import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  ViewProps,
} from "react-native";
import { PropsWithChildren } from "react";
import { StatusBar } from "expo-status-bar";
import { useThemeColor } from "@/lib/hooks/colors/useThemeColor";

export const DefaultLayout = (props: PropsWithChildren & ViewProps) => {
  const { children, style, ...rest } = props;
  const theme = useColorScheme();
  const colors = useThemeColor();

  return (
    <SafeAreaView
      style={[
        styles.content,
        {
          backgroundColor: colors.background,
        },
        style,
      ]}
      {...rest}
    >
      <StatusBar
        backgroundColor={colors.background}
        style={theme === "dark" ? "light" : "dark"}
      />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
