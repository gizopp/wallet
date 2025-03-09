import { CardData } from "../types/card";

const API_URL = "http://localhost:3000";

export interface CardFormData {
  cardNumber: string;
  cardHolder: string;
  validity: string;
  cvv: string;
}

export const cardService = {
  saveCard: async (cardFormData: CardFormData): Promise<CardData> => {
    try {
      const cardData: Omit<CardData, "id"> = {
        cardNumber: cardFormData.cardNumber.replace(/\s/g, ""),
        cardHolder: cardFormData.cardHolder,
        validity: cardFormData.validity,
        cvv: cardFormData.cvv,
        cardType: "default",
        backgroundColor: "#EFEFEF",
        textColor: "#000000",
      };

      const response = await fetch(`${API_URL}/cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardData),
      });

      if (!response.ok) {
        throw new Error(`Failed to save card: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error in cardService.saveCard:", error);
      throw error;
    }
  },

  getCards: async (): Promise<CardData[]> => {
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
};
