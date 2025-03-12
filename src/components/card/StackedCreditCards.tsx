import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { CreditCard } from "./CreditCard";
import { ICreditCard } from "../../types/creditCard";
import theme from "../../theme/theme";

interface StackedCreditCardsProps {
  cards: ICreditCard[];
  onCardPress?: (cardId: string) => void;
  selectedCardId: string | null;
}

export const StackedCreditCards: React.FC<StackedCreditCardsProps> = ({
  cards,
  onCardPress,
  selectedCardId,
}) => {
  const [orderedCards, setOrderedCards] = useState<ICreditCard[]>([]);

  useEffect(() => {
    if (cards.length === 0) {
      setOrderedCards([]);
      return;
    }

    if (selectedCardId) {
      const cardIndex = cards.findIndex((card) => card.id === selectedCardId);
      if (cardIndex !== -1 && cardIndex !== cards.length - 1) {
        const cardsWithoutSelected = cards.filter(
          (card) => card.id !== selectedCardId
        );
        const selectedCard = cards.find((card) => card.id === selectedCardId);
        if (selectedCard) {
          setOrderedCards([...cardsWithoutSelected, selectedCard]);
          return;
        }
      }
    }

    setOrderedCards([...cards]);
  }, [cards, selectedCardId]);

  const handleCardPress = (cardId: string) => {
    if (onCardPress) {
      onCardPress(cardId);
    }
  };

  const offset = 60;

  const getContainerHeight = () => {
    if (orderedCards.length === 0) return 0;
    return 240 + (orderedCards.length - 1) * offset;
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: ICreditCard;
    index: number;
  }) => (
    <View
      key={item.id}
      style={[
        styles.cardWrapper,
        {
          top: index * offset,
          zIndex: orderedCards.length + index,
        },
      ]}
      pointerEvents="box-none"
    >
      <CreditCard
        id={item.id}
        cardType={item.cardType}
        cardHolder={item.cardHolder}
        cardNumber={item.cardNumber}
        validity={item.validity}
        backgroundColor={item.backgroundColor}
        textColor={item.textColor}
        onCardPress={() => handleCardPress(item.id)}
      />
    </View>
  );

  if (orderedCards.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum cartão cadastrado</Text>
      </View>
    );
  }

  return (
    <>
      <View style={[styles.container, { height: getContainerHeight() }]}>
        {orderedCards.map((item, index) => renderItem({ item, index }))}
      </View>
      <Text
        style={{
          textAlign: "center",
          color: theme.colors.white,
          fontFamily: theme.fontFamily.regular,
          fontSize: theme.fontSize.h4,
          marginBottom: 16,
        }}
      >
        usar esse cartão
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
  },
  cardWrapper: {
    position: "absolute",
    width: "100%",
  },
  emptyContainer: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
});
