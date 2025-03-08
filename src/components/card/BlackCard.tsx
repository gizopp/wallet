import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../../theme/theme";

interface BlackCardProps {
  cardType?: string;
  cardHolder?: string;
  cardNumber?: string;
  validity?: string;
}

export const BlackCard: React.FC<BlackCardProps> = ({
  cardType = "Black Card",
  cardHolder = "João Carlos Pereira",
  cardNumber = "•••• •••• •••• 2345",
  validity = "04/32",
}) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardType}>{cardType}</Text>

      <View style={styles.cardDetails}>
        <Text style={styles.cardHolder}>{cardHolder}</Text>
        <Text style={styles.cardNumber}>{cardNumber}</Text>
        <View style={styles.validityContainer}>
          <Text style={styles.validityLabel}>Validade</Text>
          <Text style={styles.validityDate}>{validity}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 180,
    width: "100%",
    backgroundColor: "#111",
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    marginVertical: 32,
  },
  cardType: {
    color: theme.colors.white,
    fontSize: 18,
    fontFamily: theme.fontFamily.regular,
    marginBottom: 16,
  },
  cardDetails: {
    marginTop: "auto",
  },
  cardHolder: {
    color: theme.colors.white,
    fontSize: 16,
    fontFamily: theme.fontFamily.regular,
    marginBottom: 8,
  },
  cardNumber: {
    color: theme.colors.white,
    fontSize: 14,
    fontFamily: theme.fontFamily.regular,
    marginBottom: 8,
  },
  validityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  validityLabel: {
    color: theme.colors.white,
    fontSize: 14,
    fontFamily: theme.fontFamily.regular,
    marginRight: 4,
  },
  validityDate: {
    color: theme.colors.white,
    fontSize: 14,
    fontFamily: theme.fontFamily.regular,
  },
});
