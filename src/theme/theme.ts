import {
  PTSansCaption_400Regular,
  PTSansCaption_700Bold,
} from "@expo-google-fonts/pt-sans-caption";
import { moderateScale, scale } from "react-native-size-matters";

const colors = {
  darkBlue: "#142995",
  lightBlue: "#12C2E9",
  neon: "#A5FF32",
  white: "#fff",
  black: "#000",
  softBlack: "#111",
  gray: "#eee",
  lightGray: "#bbb",
};

const cardTypes = {
  light: {
    backgroundColor: colors.lightBlue,
    textColor: colors.white,
    cardType: "Light Card",
  },
  green: {
    backgroundColor: colors.neon,
    textColor: colors.black,
    cardType: "Green Card",
  },
  black: {
    backgroundColor: colors.softBlack,
    textColor: colors.white,
    cardType: "Black Card",
  },
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
  medium: scale(16),
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

const theme = {
  colors,
  fontSize,
  fontFamily,
  borderRadius,
  fonts,
  cardTypes,
};

export default theme;
