import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../../theme/theme";
import { ICreditCard } from "../../types/creditCard";

export const CreditCard: React.FC<Omit<ICreditCard, "id" | "cvv">> = ({
  cardType,
  cardHolder,
  cardNumber,
  validity,
  backgroundColor = theme.colors.lightBlue,
  textColor = theme.colors.white,
}) => {
  return (
    <View style={[styles.cardContainer, { backgroundColor }]}>
      <Text style={[styles.cardType, { color: textColor }]}>{cardType}</Text>
      <View style={styles.cardDetails}>
        <Text style={[styles.cardHolder, { color: textColor }]}>
          {cardHolder}
        </Text>
        <Text style={[styles.cardNumber, { color: textColor }]}>
          {cardNumber}
        </Text>
        <Text style={[styles.validityLabel, { color: textColor }]}>
          Validade {validity}
        </Text>
      </View>
    </View>
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
