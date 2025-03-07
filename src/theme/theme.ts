import {
  PTSansCaption_400Regular,
  PTSansCaption_700Bold,
} from "@expo-google-fonts/pt-sans-caption";

const colors = {
  darkBlue: "#1a237e",
  lightBlue: "#12C2E9",
  neon: "#A5FF32",
  white: "#fff",
  black: "#000",
};

const fontSize = {
  h1: 28,
  h4: 18,
};

const borderRadius = {
  default: 12,
  big: 50,
};

const fontFamily = {
  regular: "PTSansCaption-Regular",
  bold: "PTSansCaption-Bold",
};

const fonts = {
  "PTSansCaption-Regular": PTSansCaption_400Regular,
  "PTSansCaption-Bold": PTSansCaption_700Bold,
};

const theme = {
  colors,
  fontSize,
  fontFamily,
  borderRadius,
};

export default theme;
