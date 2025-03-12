import React from "react";
import { View, TouchableOpacity } from "react-native";
import theme from "../../theme/theme";
import { ICreditCard } from "../../types/creditCard";
import CustomText from "../text/CustomText";

export const CreditCard: React.FC<Omit<ICreditCard, "cvv" | "id">> = ({
  cardType,
  cardHolder,
  cardNumber,
  validity,
  backgroundColor,
  textColor,
  onCardPress,
}) => {
  const getCardStyle = () => {
    let bgColor = theme.colors.lightBlue;
    let txtColor = theme.colors.white;

    if (cardType === "Light Card") {
      bgColor = theme.cardTypes.light.backgroundColor;
      txtColor = theme.cardTypes.light.textColor;
    } else if (cardType === "Green Card") {
      bgColor = theme.cardTypes.green.backgroundColor;
      txtColor = theme.cardTypes.green.textColor;
    } else if (cardType === "Black Card") {
      bgColor = theme.cardTypes.black.backgroundColor;
      txtColor = theme.cardTypes.black.textColor;
    }

    return {
      backgroundColor: backgroundColor || bgColor,
      textColor: textColor || txtColor,
    };
  };

  const { backgroundColor: bgColor, textColor: txtColor } = getCardStyle();

  const formatCardNumber = (number: string) => {
    const cleanNumber = number.replace(/\s+/g, "");
    const lastFourDigits = cleanNumber.slice(-4);
    const maskedSection = "•••• •••• •••• ";
    return maskedSection + lastFourDigits;
  };

  return (
    <TouchableOpacity
      style={{
        height: 180,
        width: "100%",
        borderRadius: theme.borderRadius.medium,
        paddingVertical: 28,
        paddingHorizontal: 20,
        justifyContent: "space-around",
        marginVertical: 32,
        backgroundColor: bgColor,
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 12,
      }}
      onPress={onCardPress}
      activeOpacity={0.95}
    >
      <View>
        <CustomText
          style={{
            fontSize: theme.fontSize.h3,
            color: txtColor,
          }}
        >
          {cardType}
        </CustomText>
      </View>

      <View style={{ marginTop: 20 }}>
        <CustomText
          style={{
            fontSize: theme.fontSize.h4,
            marginBottom: 2,
            color: txtColor,
          }}
        >
          {cardHolder}
        </CustomText>

        <CustomText
          style={{
            fontSize: theme.fontSize.h5,
            marginBottom: 2,
            color: txtColor,
          }}
        >
          {formatCardNumber(cardNumber)}
        </CustomText>

        <CustomText
          style={{
            fontSize: theme.fontSize.h5,
            color: txtColor,
          }}
        >
          Validade {validity}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};
