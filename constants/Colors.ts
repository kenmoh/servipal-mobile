const tintColorLight = "#0000CD";
const tintColorDark = "#fff";

export type themeMode = "dark" | "light";
type ThemeProps = {
  text: string;
  background: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
  inputBackground: string;
  profileCard: string;
  borderColor: string;
};

type ColorProps = {
  primaryBtnColor: string;
  secondaryBtnColor: string;
  blackBtnColor: string;
  light: ThemeProps;
  dark: ThemeProps;
  error: string;
  pickUpColor: string;
  pendingColor: string;
  success: string;
  delivered: string;
  btnPrimaryColor: string;
  whiteText: string;
};

export const Colors: ColorProps = {
  primaryBtnColor: tintColorLight,
  secondaryBtnColor: tintColorDark,
  blackBtnColor: tintColorDark,
  whiteText: "#fff",
  pickUpColor: "#f1dca7",
  error: "#ff5e5b",
  pendingColor: "#fae1dd",
  success: "#b9fbc0",
  delivered: "#81b0ff",
  btnPrimaryColor: "orange",
  light: {
    text: "#11181C",
    background: "#fff",
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    inputBackground: "#f0f2f5",
    borderColor: "#eee",
    profileCard: "#f0f2f5",
  },
  dark: {
    text: "#fff",
    background: "#18191c",
    icon: "#9BA1A6",
    tabIconDefault: "#ddd",
    tabIconSelected: tintColorDark,
    inputBackground: "#303339",
    profileCard: "#303339",
    borderColor: "#2f4550",
  },
};
