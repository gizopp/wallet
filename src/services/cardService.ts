import { Dispatch } from "@reduxjs/toolkit";
import {
  setBackgroundColor,
  setCardType,
  setTextColor,
} from "../store/slices/cardSlice";
import theme from "../theme/theme";
import { ICreditCard } from "../types/creditCard";
import { showToast } from "../utils/showToast";

const API_URL = "http://localhost:3000";

export interface CardFormData {
  cardNumber: string;
  cardHolder: string;
  validity: string;
  cvv: string;
}

export const cardService = {
  saveCard: async (cardFormData: CardFormData, dispatch: Dispatch) => {
    try {
      const existingCards = await cardService.getCards();

      type CardTypeKey = keyof typeof theme.cardTypes;
      const usedCardTypes = existingCards.map((card) => card.cardType);
      const availableCardTypes = (
        Object.keys(theme.cardTypes) as CardTypeKey[]
      ).filter(
        (cardKey) => !usedCardTypes.includes(theme.cardTypes[cardKey].cardType)
      );

      const randomCardTypeKey =
        availableCardTypes[
          Math.floor(Math.random() * availableCardTypes.length)
        ];
      const selectedCardType = theme.cardTypes[randomCardTypeKey];

      const cardData: Omit<ICreditCard, "id"> = {
        cardNumber: cardFormData.cardNumber,
        cardHolder: cardFormData.cardHolder,
        validity: cardFormData.validity,
        cvv: cardFormData.cvv,
        cardType: selectedCardType.cardType,
        backgroundColor: selectedCardType.backgroundColor,
        textColor: selectedCardType.textColor,
      };

      dispatch(setBackgroundColor(selectedCardType.backgroundColor));
      dispatch(setTextColor(selectedCardType.textColor));
      dispatch(setCardType(selectedCardType.cardType));

      const response = await fetch(`${API_URL}/cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardData),
      });

      if (!response.ok) {
        showToast({
          title: "Erro",
          message: `Falha ao salvar cartão: ${response.status}`,
        });
        throw new Error(`Failed to save card: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error in cardService.saveCard:", error);
      showToast({
        title: "Erro",
        message: "Ocorreu um erro ao salvar o cartão",
      });
      throw error;
    }
  },

  getCards: async (): Promise<ICreditCard[]> => {
    try {
      const response = await fetch(`${API_URL}/cards`);
      if (!response.ok) {
        throw new Error(`Failed to fetch cards: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error in cardService.getCards:", error);
      throw error;
    }
  },

  deleteCard: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/cards/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete card: ${response.status}`);
      }
    } catch (error) {
      console.error("Error in cardService.deleteCard:", error);
      throw error;
    }
  },
};
