import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  Image,
  ImageSourcePropType,
  ColorValue,
} from "react-native";
import theme from "../../theme/theme";

interface InputProps extends TextInputProps {
  label: string;
  labelColor?: ColorValue;
  leftIcon?: ImageSourcePropType;
}

export const Input: React.FC<InputProps> = ({
  label,
  labelColor = theme.colors.white,
  leftIcon,
  ...textInputProps
}) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: labelColor || theme.colors.white,
          marginBottom: 8,
          fontSize: 16,
          fontFamily: theme.fontFamily.regular,
        }}
      >
        {label}
      </Text>
      <View style={styles.inputContainer}>
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
        <TextInput style={styles.input} {...textInputProps} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    borderRadius: 6,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingRight: 16,
    fontSize: 16,
    color: theme.colors.darkBlue,
    fontFamily: theme.fontFamily.regular,
  },
});
