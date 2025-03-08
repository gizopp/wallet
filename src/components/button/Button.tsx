import { TouchableOpacity, Text, ColorValue } from "react-native";
import theme from "../../theme/theme";

type TButtonProps = {
  text: string;
  backgroundColor: ColorValue | undefined;
  textColor: ColorValue | undefined;
};

export const Button = ({
  text,
  backgroundColor = theme.colors.lightBlue,
  textColor = theme.colors.white,
}: TButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: backgroundColor,
        width: "100%",
        padding: 16,
        borderRadius: theme.borderRadius.default,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontFamily: theme.fontFamily.regular,
          color: textColor,
          fontSize: theme.fontSize.h4,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
