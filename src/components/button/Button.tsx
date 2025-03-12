import { TouchableOpacity, ColorValue } from "react-native";
import theme from "../../theme/theme";
import React from "react";
import CustomText from "../text/CustomText";

type TButtonProps = {
  text: string;
  backgroundColor?: ColorValue | undefined;
  textColor?: ColorValue | undefined;
  onPress?: () => void;
  disabled?: boolean;
  testId?: string;
};

export const Button = ({
  text,
  backgroundColor = theme.colors.lightBlue,
  textColor = theme.colors.white,
  onPress,
  disabled = false,
  testId,
}: TButtonProps) => {
  return (
    <TouchableOpacity
      testID={testId || "button-touchable"}
      style={{
        backgroundColor: disabled ? theme.colors.gray : backgroundColor,
        width: "100%",
        padding: 16,
        borderRadius: theme.borderRadius.default,
        alignItems: "center",
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <CustomText
        testID="button-text"
        style={{
          color: disabled ? theme.colors.lightGray : textColor,
          fontSize: theme.fontSize.h4,
        }}
      >
        {text}
      </CustomText>
    </TouchableOpacity>
  );
};
