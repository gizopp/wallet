import React from "react";
import { Text, TextProps, TextStyle } from "react-native";
import theme from "../../theme/theme";

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  style,
  ...rest
}) => {
  const defaultStyles = {
    fontFamily: theme.fontFamily.regular,
  };

  return (
    <Text style={{ ...defaultStyles, ...style }} {...rest}>
      {children}
    </Text>
  );
};

export default CustomText;
