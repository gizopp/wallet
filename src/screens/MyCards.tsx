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
        <View style={{ flex: 1 }}>
          <StackedCreditCards />
        </View>
        <Text style={styles.useCardText}>usar esse cartão</Text>
        <Button text="pagar com este cartão" />
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
  },
  useCardText: {
    textAlign: "center",
    color: theme.colors.white,
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSize.h4,
  },
});
