import {
  PTSansCaption_400Regular,
  PTSansCaption_700Bold,
} from "@expo-google-fonts/pt-sans-caption";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const colors = {
  darkBlue: "#142995",
  lightBlue: "#12C2E9",
  neon: "#A5FF32",
  white: "#fff",
  black: "#000",
  gray: "#eee",
  lightGray: "#bbb",
};

const fontSize = {
  h1: moderateScale(28),
  h2: moderateScale(22),
  h3: moderateScale(18),
  h4: moderateScale(16),
  h5: moderateScale(14),
};

const borderRadius = {
  default: scale(12),
  large: scale(50),
};

const fontFamily = {
  regular: "PTSansCaption_400Regular",
  bold: "PTSansCaption_700Bold",
};

const fonts = {
  PTSansCaption_400Regular,
  PTSansCaption_700Bold,
};

const scaling = {
  moderateScale,
  scale,
  verticalScale,
};

const theme = {
  colors,
  fontSize,
  fontFamily,
  borderRadius,
  fonts,
  scaling,
};

export default theme;
