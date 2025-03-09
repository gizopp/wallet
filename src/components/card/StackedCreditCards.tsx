import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { CreditCard } from "./CreditCard";

interface CardData {
  id: string;
  cardType: string;
  cardHolder: string;
  cardNumber: string;
  validity: string;
  backgroundColor: string;
  textColor?: string;
}

interface StackedCreditCardsProps {
  cards: CardData[];
  cardOffset?: number;
  onCardPress?: (cardId: string) => void;
}

const DEFAULT_OFFSET = 0;

export const StackedCreditCards: React.FC<StackedCreditCardsProps> = ({
  cards,
  cardOffset = DEFAULT_OFFSET,
  onCardPress,
}) => {
  const getContainerHeight = () => {
    if (cards.length === 0) return 0;
    return 180 + (cards.length - 1) * cardOffset;
  };

  return (
    <View style={[styles.container, { height: getContainerHeight() }]}>
      {cards.map((card, index) => (
        <TouchableOpacity
          key={card.id}
          style={[
            styles.cardWrapper,
            {
              top: index * cardOffset,
              zIndex: cards.length + index,
            },
          ]}
          onPress={() => onCardPress && onCardPress(card.id)}
          activeOpacity={0.95}
        >
          <CreditCard
            cardType={card.cardType}
            cardHolder={card.cardHolder}
            cardNumber={card.cardNumber}
            validity={card.validity}
            backgroundColor={card.backgroundColor}
            textColor={card.textColor}
          />
        </TouchableOpacity>
      ))}
    </View>
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
});
