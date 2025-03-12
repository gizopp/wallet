import { TouchableOpacity, Text, ColorValue } from "react-native";
import theme from "../../theme/theme";

type TButtonProps = {
  text: string;
  backgroundColor?: ColorValue | undefined;
  textColor?: ColorValue | undefined;
  onPress?: () => void;
  disabled?: boolean;
};

// Adicione um testID ao TouchableOpacity para facilitar o teste
export const Button = ({
  text,
  backgroundColor = theme.colors.lightBlue,
  textColor = theme.colors.white,
  onPress,
  disabled = false,
}: TButtonProps) => {
  return (
    <TouchableOpacity
      testID="button-touchable"
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
      <Text
        testID="button-text"
        style={{
          fontFamily: theme.fontFamily.regular,
          color: disabled ? theme.colors.lightGray : textColor,
          fontSize: theme.fontSize.h4,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
