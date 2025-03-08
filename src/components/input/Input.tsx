import React from "react";
import {
  View,
  Text,
  TextInputProps,
  Image,
  ImageSourcePropType,
  ColorValue,
} from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import theme from "../../theme/theme";

interface InputProps extends Omit<TextInputProps, "value" | "onChangeText"> {
  label: string;
  labelColor?: ColorValue;
  leftIcon?: ImageSourcePropType;
  mask?: string;
  value?: string;
  onChangeText?: (text: string, rawText: string) => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  labelColor = theme.colors.white,
  leftIcon,
  mask,
  value,
  onChangeText,
  ...textInputProps
}) => {
  return (
    <View style={{ width: "100%" }}>
      <Text
        style={{
          color: labelColor || theme.colors.white,
          marginBottom: 8,
          fontSize: 16,
          fontFamily: theme.fontFamily.regular,
        }}
        numberOfLines={1}
      >
        {label}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.colors.white,
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        {leftIcon && (
          <View
            style={{
              width: 32,
              height: 32,
              backgroundColor: theme.colors.lightBlue,
              borderRadius: theme.borderRadius.big,
              marginLeft: 10,
              marginRight: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={leftIcon}
              style={{
                width: 18,
                height: 18,
                resizeMode: "contain",
              }}
            />
          </View>
        )}
        <MaskedTextInput
          mask={mask}
          value={value}
          onChangeText={onChangeText}
          style={{
            flex: 1,
            paddingVertical: 16,
            paddingRight: 16,
            paddingLeft: !leftIcon && 15,
            fontSize: 16,
            color: theme.colors.black,
            fontFamily: theme.fontFamily.regular,
          }}
          {...textInputProps}
        />
      </View>
    </View>
  );
};
