import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  Image,
  ImageSourcePropType,
} from "react-native";
import theme from "../../theme/theme";

interface InputProps extends TextInputProps {
  label: string;
  leftIcon?: ImageSourcePropType;
}

export const Input: React.FC<InputProps> = ({
  label,
  leftIcon,
  ...textInputProps
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} {...textInputProps} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    color: theme.colors.white,
    marginBottom: 8,
    fontSize: 16,
    fontFamily: theme.fontFamily.regular,
  },
  inputContainer: {
    position: "relative",
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
    paddingLeft: 10,
    fontSize: 16,
    color: theme.colors.darkBlue,
    fontFamily: theme.fontFamily.regular,
  },
});
