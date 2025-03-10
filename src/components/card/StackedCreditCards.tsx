import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { CreditCard } from "./CreditCard";
import { ICreditCard } from "../../types/creditCard";
import { cardService } from "../../services/cardService";

interface StackedCreditCardsProps {
  onCardPress?: (cardId: string) => void;
}

export const StackedCreditCards: React.FC<StackedCreditCardsProps> = ({
  onCardPress,
}) => {
  const [cards, setCards] = useState<ICreditCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const flatListRef = useRef<FlatList<ICreditCard>>(null);

  const handleCardPress = (cardId: string) => {
    setSelectedCard(cardId);

    const cardIndex = cards.findIndex((card) => card.id === cardId);
    if (cardIndex !== cards.length - 1) {
      const newOrderedCards = [...cards];
      const selectedCard = newOrderedCards[cardIndex];
      newOrderedCards.splice(cardIndex, 1);
      newOrderedCards.push(selectedCard);
      setCards(newOrderedCards);
    }

    if (onCardPress) {
      onCardPress(cardId);
    }
  };

  const offset = 60;
  const getContainerHeight = () => {
    if (cards.length === 0) return 0;
    return 240 + (cards.length - 1) * offset;
  };

  useEffect(() => {
    const fetchCards = async () => {
      const fetchedCards = await cardService.getCards();
      console.log("FETCHED: ", fetchedCards);
      setCards(fetchedCards);
      if (fetchedCards.length > 0) {
        setSelectedCard(fetchedCards[fetchedCards.length - 1].id);
      }
    };
    fetchCards();
  }, []);

  const renderItem = ({
    item,
    index,
  }: {
    item: ICreditCard;
    index: number;
  }) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.cardWrapper,
        {
          top: index * offset,
          zIndex: cards.length + index,
        },
      ]}
      onPress={() => handleCardPress(item.id)}
      activeOpacity={0.95}
    >
      <CreditCard
        cardType={item.cardType}
        cardHolder={item.cardHolder}
        cardNumber={item.cardNumber}
        validity={item.validity}
        backgroundColor={item.backgroundColor}
        textColor={item.textColor}
      />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { height: getContainerHeight() }]}>
      <FlatList
        ref={flatListRef}
        data={cards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        removeClippedSubviews={false}
        CellRendererComponent={({ children, index, style, ...props }) => (
          <View style={[style]} {...props}>
            {children}
          </View>
        )}
      />
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
