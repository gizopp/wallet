import React from "react";
import { useFormContext } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
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
  error?: string;
  testID?: string;
}

interface FormInputProps
  extends Omit<InputProps, "error" | "value" | "onChangeText"> {
  name: string;
}

export const FormInput: React.FC<FormInputProps> = ({ name, ...props }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  React.useEffect(() => {
    register(name);
  }, [register, name]);

  const value = watch(name) as string;

  const handleChangeText = (text: string, rawText?: string) => {
    setValue(name, text, { shouldValidate: true });
  };

  return (
    <Input
      {...props}
      value={value || ""}
      error={(errors[name]?.message as string) || undefined}
      onChangeText={handleChangeText}
    />
  );
};

export const Input: React.FC<InputProps> = ({
  label,
  labelColor = theme.colors.white,
  leftIcon,
  mask,
  value,
  onChangeText,
  error,
  testID,
  ...textInputProps
}) => {
  const handleRegularTextChange = (text: string) => {
    if (onChangeText) {
      onChangeText(text, text);
    }
  };

  const handleMaskedTextChange = (text: string, rawText: string) => {
    if (onChangeText) {
      onChangeText(text, rawText);
    }
  };

  return (
    <View style={{ width: "100%" }}>
      <Text
        style={{
          color: labelColor || theme.colors.white,
          marginBottom: 8,
          fontSize: theme.fontSize.h5,
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
          borderWidth: error ? 1 : 0,
          borderColor: error ? "red" : "transparent",
        }}
      >
        {leftIcon && (
          <View
            style={{
              width: 32,
              height: 32,
              backgroundColor: theme.colors.lightBlue,
              borderRadius: theme.borderRadius.large,
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

        {mask ? (
          <MaskedTextInput
            mask={mask}
            value={value}
            onChangeText={handleMaskedTextChange}
            style={{
              flex: 1,
              paddingVertical: 16,
              paddingRight: 16,
              paddingLeft: !leftIcon ? 15 : undefined,
              fontSize: 16,
              color: theme.colors.black,
              fontFamily: theme.fontFamily.regular,
            }}
            testID={testID}
            {...textInputProps}
          />
        ) : (
          <TextInput
            value={value}
            onChangeText={handleRegularTextChange}
            style={{
              flex: 1,
              paddingVertical: 16,
              paddingRight: 16,
              paddingLeft: !leftIcon ? 15 : undefined,
              fontSize: 16,
              color: theme.colors.black,
              fontFamily: theme.fontFamily.regular,
            }}
            testID={testID}
            {...textInputProps}
          />
        )}
      </View>
      {error && (
        <Text
          style={{
            color: "red",
            fontSize: 12,
            marginTop: 4,
            fontFamily: theme.fontFamily.regular,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};
