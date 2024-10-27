/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const GRAY = {
  GRAY_50: "#f7f7f8",
  GRAY_100: "#eeeef0",
  GRAY_200: "#dadadd",
  GRAY_300: "#babbbf",
  GRAY_400: "#94959c",
  GRAY_500: "#767681",
  GRAY_600: "#606169",
  GRAY_700: "#4e4e56",
  GRAY_800: "#434349",
  GRAY_900: "#3b3c3f",
  GRAY_950: "#27272a",
};

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    border: "#E0E0E0",
    subtitle: GRAY.GRAY_500,
    group: GRAY.GRAY_100,
    placeholder: GRAY.GRAY_400,
    surface: GRAY.GRAY_50,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    border: "#262626",
    subtitle: GRAY.GRAY_400,
    group: GRAY.GRAY_950,
    placeholder: GRAY.GRAY_600,
    surface: GRAY.GRAY_900,
  },
  common: {
    transparent: "transparent",
    white: "#fff",
    red: "#FF0000",
    primary: "#E3A461",
    gray: GRAY,
    success: "#34A853",
    error: "#EA4335",
    info: "#4285F4",
    warning: "#F4B400",
    saved: "#34A853",
  },
};
