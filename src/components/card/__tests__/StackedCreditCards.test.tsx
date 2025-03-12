import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import theme from "../../../theme/theme";
import { ICreditCard } from "../../../types/creditCard";
import { StackedCreditCards } from "../StackedCreditCards";

describe("StackedCreditCards", () => {
  const mockCards: ICreditCard[] = [
    {
      id: "card1",
      cardType: "Light Card",
      cardHolder: "John Doe",
      cardNumber: "4111 1111 1111 1111",
      validity: "12/25",
      cvv: "123",
      backgroundColor: theme.cardTypes.light.backgroundColor,
      textColor: theme.cardTypes.light.textColor,
    },
    {
      id: "card2",
      cardType: "Green Card",
      cardHolder: "Jane Smith",
      cardNumber: "5555 5555 5555 4444",
      validity: "10/26",
      cvv: "456",
      backgroundColor: theme.cardTypes.green.backgroundColor,
      textColor: theme.cardTypes.green.textColor,
    },
    {
      id: "card3",
      cardType: "Black Card",
      cardHolder: "Bob Johnson",
      cardNumber: "3782 8224 0005 4535",
      validity: "05/27",
      cvv: "678",
      backgroundColor: theme.cardTypes.black.backgroundColor,
      textColor: theme.cardTypes.black.textColor,
    },
  ];

  it("renders correctly with cards", () => {
    const { getByText, queryByText } = render(
      <StackedCreditCards cards={mockCards} selectedCardId={null} />
    );

    expect(getByText("•••• •••• •••• 1111")).toBeTruthy();
    expect(getByText("•••• •••• •••• 4444")).toBeTruthy();
    expect(getByText("•••• •••• •••• 4535")).toBeTruthy();

    expect(getByText("John Doe")).toBeTruthy();
    expect(getByText("Jane Smith")).toBeTruthy();
    expect(getByText("Bob Johnson")).toBeTruthy();

    expect(queryByText("Nenhum cartão cadastrado")).toBeNull();
  });

  it("renders empty state when no cards are provided", () => {
    const { getByText } = render(
      <StackedCreditCards cards={[]} selectedCardId={null} />
    );

    expect(getByText("Nenhum cartão cadastrado")).toBeTruthy();
  });

  it("calls onCardPress when a card is pressed", () => {
    const mockOnCardPress = jest.fn();
    const { getAllByText } = render(
      <StackedCreditCards
        cards={mockCards}
        selectedCardId={null}
        onCardPress={mockOnCardPress}
      />
    );

    fireEvent.press(getAllByText("Light Card")[0]);
    expect(mockOnCardPress).toHaveBeenCalledWith("card1");

    fireEvent.press(getAllByText("Green Card")[0]);
    expect(mockOnCardPress).toHaveBeenCalledWith("card2");
  });

  it("reorders cards when a card is selected", () => {
    const { rerender, getAllByText } = render(
      <StackedCreditCards cards={mockCards} selectedCardId={null} />
    );

    const lightCards = getAllByText("Light Card");
    const greenCards = getAllByText("Green Card");
    const blackCards = getAllByText("Black Card");

    expect(lightCards.length).toBe(1);
    expect(greenCards.length).toBe(1);
    expect(blackCards.length).toBe(1);

    rerender(<StackedCreditCards cards={mockCards} selectedCardId="card1" />);

    const cardNumbers = getAllByText(/\d{4}/);

    expect(cardNumbers[0].props.children).toBe("•••• •••• •••• 4444");
    expect(cardNumbers[1].props.children).toBe("•••• •••• •••• 4535");
    expect(cardNumbers[2].props.children).toBe("•••• •••• •••• 1111");
  });

  it("handles selecting card that is already at the top", () => {
    const { rerender, getAllByText } = render(
      <StackedCreditCards
        cards={[mockCards[0], mockCards[1], mockCards[2]]}
        selectedCardId="card3"
      />
    );

    let cardHolders = getAllByText(/John|Jane|Bob/);
    expect(cardHolders[0].props.children).toBe("John Doe");
    expect(cardHolders[1].props.children).toBe("Jane Smith");
    expect(cardHolders[2].props.children).toBe("Bob Johnson");

    rerender(
      <StackedCreditCards
        cards={[mockCards[0], mockCards[1], mockCards[2]]}
        selectedCardId="card3"
      />
    );

    cardHolders = getAllByText(/John|Jane|Bob/);
    expect(cardHolders[0].props.children).toBe("John Doe");
    expect(cardHolders[1].props.children).toBe("Jane Smith");
    expect(cardHolders[2].props.children).toBe("Bob Johnson");
  });

  it("handles card removal", () => {
    const { rerender, queryByText, getAllByText } = render(
      <StackedCreditCards cards={mockCards} selectedCardId={null} />
    );

    expect(getAllByText("Light Card").length).toBe(1);
    expect(getAllByText("Green Card").length).toBe(1);
    expect(getAllByText("Black Card").length).toBe(1);

    const updatedCards = [mockCards[0], mockCards[2]];
    rerender(<StackedCreditCards cards={updatedCards} selectedCardId={null} />);

    expect(getAllByText("Light Card").length).toBe(1);
    expect(queryByText("Green Card")).toBeNull();
    expect(getAllByText("Black Card").length).toBe(1);

    const remainingHolders = getAllByText(/John|Bob/);
    expect(remainingHolders.length).toBe(2);
    expect(remainingHolders[0].props.children).toBe("John Doe");
    expect(remainingHolders[1].props.children).toBe("Bob Johnson");
  });
});
