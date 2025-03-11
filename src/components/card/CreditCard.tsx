import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../../theme/theme";
import { ICreditCard } from "../../types/creditCard";

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

  return (
    <TouchableOpacity
      style={[styles.cardContainer, { backgroundColor: bgColor }]}
      onPress={onCardPress}
      activeOpacity={0.95}
    >
      <View>
        <Text style={[styles.cardType, { color: txtColor }]}>{cardType}</Text>
      </View>
      <View style={styles.cardDetails}>
        <Text style={[styles.cardHolder, { color: txtColor }]}>
          {cardHolder}
        </Text>
        <Text style={[styles.cardNumber, { color: txtColor }]}>
          {cardNumber}
        </Text>
        <Text style={[styles.validityLabel, { color: txtColor }]}>
          Validade {validity}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 180,
    width: "100%",
    borderRadius: 16,
    paddingVertical: 28,
    paddingHorizontal: 20,
    justifyContent: "space-around",
    marginVertical: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 12,
  },
  cardType: {
    fontSize: 18,
    fontFamily: theme.fontFamily.regular,
  },
  cardDetails: {
    marginTop: 20,
  },
  cardHolder: {
    fontSize: 16,
    fontFamily: theme.fontFamily.regular,
    marginBottom: 2,
  },
  cardNumber: {
    fontSize: 14,
    fontFamily: theme.fontFamily.regular,
    marginBottom: 2,
  },
  validityLabel: {
    fontSize: 14,
    fontFamily: theme.fontFamily.regular,
  },
});
