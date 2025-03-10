import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import theme from "../theme/theme";
import { MyCardsHeader } from "../components/header/MyCardsHeader";
import { Button } from "../components/button/Button";
import { StackedCreditCards } from "../components/card/StackedCreditCards";

export const MyCards: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MyCardsHeader />
      <View style={styles.contentContainer}>
        <View style={styles.cardsContainer}>
          <StackedCreditCards />
        </View>
        <View style={styles.actionContainer}>
          <Text style={styles.useCardText}>usar esse cartão</Text>
          <Button text="pagar com este cartão" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.darkBlue,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 32,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  cardsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actionContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  useCardText: {
    textAlign: "center",
    color: theme.colors.white,
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSize.h4,
    marginBottom: 16,
  },
});
