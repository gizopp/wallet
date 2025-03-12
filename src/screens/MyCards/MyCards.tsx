import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import theme from "../../theme/theme";
import { MyCardsHeader } from "../../components/header/MyCardsHeader";
import { Button } from "../../components/button/Button";
import { StackedCreditCards } from "../../components/card/StackedCreditCards";
import { ICreditCard } from "../../types/creditCard";
import { cardService } from "../../services/cardService";

export const MyCards: React.FC = () => {
  const [cards, setCards] = useState<ICreditCard[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchCards = async () => {
        try {
          const fetchedCards = await cardService.getCards();
          setCards(fetchedCards);
          if (fetchedCards.length > 0) {
            setSelectedCardId(fetchedCards[fetchedCards.length - 1].id);
          } else {
            setSelectedCardId(null);
          }
        } catch (error) {
          console.error("Failed to fetch cards:", error);
        }
      };

      fetchCards();
    }, [])
  );

  const handleCardPress = (cardId: string) => {
    setSelectedCardId(cardId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <MyCardsHeader />
      <View style={styles.contentContainer}>
        <View style={styles.cardsContainer}>
          <StackedCreditCards
            cards={cards}
            onCardPress={handleCardPress}
            selectedCardId={selectedCardId}
          />
        </View>
        <View style={styles.actionContainer}>
          <Button text="pagar com este cartão" disabled={!selectedCardId} />
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
