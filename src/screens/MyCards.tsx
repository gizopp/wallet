import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TRootStackParamList } from "../components/navigation/RootStack";
import theme from "../theme/theme";
import { MyCardsHeader } from "../components/header/MyCardsHeader";
import { Button } from "../components/button/Button";
import { StackedCreditCards } from "../components/card/StackedCreditCards";

// Definição da interface para os dados do cartão
interface CardData {
  id: string;
  cardType: string;
  cardHolder: string;
  cardNumber: string;
  validity: string;
  backgroundColor: string;
  textColor?: string;
}

export const MyCards: React.FC = () => {
  const navigation = useNavigation<NavigationProp<TRootStackParamList>>();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const [orderedCards, setOrderedCards] = useState<CardData[]>([
    {
      id: "1",
      cardType: "Black Card",
      cardHolder: "João Carlos Pereira",
      cardNumber: "•••• •••• •••• 1234",
      validity: "06/29",
      backgroundColor: "#000000",
    },
    {
      id: "2",
      cardType: "Green Card",
      cardHolder: "João Carlos Pereira",
      cardNumber: "•••• •••• •••• 5678",
      validity: "08/30",
      backgroundColor: "#B9F73E",
      textColor: theme.colors.black,
    },
  ]);

  const handleCardPress = (cardId: string) => {
    setSelectedCard(cardId);

    const newOrderedCards = [...orderedCards];
    const cardIndex = newOrderedCards.findIndex((card) => card.id === cardId);

    if (cardIndex !== newOrderedCards.length - 1) {
      const selectedCard = newOrderedCards[cardIndex];
      newOrderedCards.splice(cardIndex, 1);
      newOrderedCards.push(selectedCard);
      setOrderedCards(newOrderedCards);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MyCardsHeader />
      <View style={styles.contentContainer}>
        <View style={{ flex: 1 }}>
          <StackedCreditCards
            cards={orderedCards}
            cardOffset={60}
            onCardPress={handleCardPress}
          />
        </View>
        <Text
          style={{
            textAlign: "center",
            color: theme.colors.white,
            fontFamily: theme.fontFamily.regular,
            fontSize: theme.fontSize.h4,
          }}
        >
          usar esse cartão
        </Text>
        <View style={styles.bottomSpacer} />
        <View style={styles.buttonContainer}>
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
  },
  cardsContainer: {
    height: 260,
  },
  bottomSpacer: {
    flex: 1,
  },
  buttonContainer: {
    marginBottom: 32,
  },
});
