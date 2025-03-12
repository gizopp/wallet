import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { CreditCard } from "../CreditCard";
import theme from "../../../theme/theme";

describe("CreditCard", () => {
  const defaultProps = {
    cardType: "Light Card",
    cardHolder: "GIOVANA ZOPELARO",
    cardNumber: "•••• •••• •••• 1234",
    validity: "12/25",
    onCardPress: jest.fn(),
    backgroundColor: theme.colors.lightBlue,
    textColor: theme.colors.white,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with default props", () => {
    const { getByText } = render(<CreditCard {...defaultProps} />);
    expect(getByText("Light Card")).toBeTruthy();
    expect(getByText("GIOVANA ZOPELARO")).toBeTruthy();
    expect(getByText("•••• •••• •••• 1234")).toBeTruthy();
    expect(getByText("Validade 12/25")).toBeTruthy();
  });

  it("calls onCardPress when card is pressed", () => {
    const { getByText } = render(<CreditCard {...defaultProps} />);
    const cardContainer = getByText("Light Card").parent.parent;
    fireEvent.press(cardContainer);
    expect(defaultProps.onCardPress).toHaveBeenCalledTimes(1);
  });

  it("applies custom background and text colors", () => {
    const customProps = {
      ...defaultProps,
      backgroundColor: "#FF0000",
      textColor: "#00FF00",
    };
    const { getByText, UNSAFE_getByProps } = render(
      <CreditCard {...customProps} />
    );

    const touchableOpacity = UNSAFE_getByProps({ activeOpacity: 0.95 });
    expect(touchableOpacity.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: "#FF0000",
      })
    );

    const cardTypeText = getByText("Light Card");
    expect(cardTypeText.props.style).toEqual(
      expect.objectContaining({
        color: "#00FF00",
      })
    );
  });

  it("uses provided colors", () => {
    const { getByText, UNSAFE_getByProps } = render(
      <CreditCard {...defaultProps} />
    );

    const touchableOpacity = UNSAFE_getByProps({ activeOpacity: 0.95 });
    expect(touchableOpacity.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: theme.colors.lightBlue,
      })
    );

    const cardTypeText = getByText("Light Card");
    expect(cardTypeText.props.style).toEqual(
      expect.objectContaining({
        color: theme.colors.white,
      })
    );
  });

  it("has correct styling for card elements", () => {
    const { getByText } = render(<CreditCard {...defaultProps} />);

    const cardTypeText = getByText("Light Card");
    expect(cardTypeText.props.style).toEqual(
      expect.objectContaining({
        fontSize: theme.fontSize.h3,
        fontFamily: theme.fontFamily.regular,
      })
    );

    const cardHolderText = getByText("GIOVANA ZOPELARO");
    expect(cardHolderText.props.style).toEqual(
      expect.objectContaining({
        fontSize: theme.fontSize.h4,
        fontFamily: theme.fontFamily.regular,
      })
    );

    const cardNumberText = getByText("•••• •••• •••• 1234");
    expect(cardNumberText.props.style).toEqual(
      expect.objectContaining({
        fontSize: theme.fontSize.h5,
        fontFamily: theme.fontFamily.regular,
      })
    );
  });

  it("applies 'Light Card' theme when provided", () => {
    const props = {
      ...defaultProps,
      cardType: "Light Card",
      backgroundColor: theme.cardTypes.light.backgroundColor,
      textColor: theme.cardTypes.light.textColor,
    };

    const { getByText, UNSAFE_getByProps } = render(<CreditCard {...props} />);

    const touchableOpacity = UNSAFE_getByProps({ activeOpacity: 0.95 });
    expect(touchableOpacity.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: theme.cardTypes.light.backgroundColor,
      })
    );

    const cardTypeText = getByText("Light Card");
    expect(cardTypeText.props.style).toEqual(
      expect.objectContaining({
        color: theme.cardTypes.light.textColor,
      })
    );
  });

  it("applies 'Green Card' theme when provided", () => {
    const props = {
      ...defaultProps,
      cardType: "Green Card",
      backgroundColor: theme.cardTypes.green.backgroundColor,
      textColor: theme.cardTypes.green.textColor,
    };

    const { getByText, UNSAFE_getByProps } = render(<CreditCard {...props} />);

    const touchableOpacity = UNSAFE_getByProps({ activeOpacity: 0.95 });
    expect(touchableOpacity.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: theme.cardTypes.green.backgroundColor,
      })
    );

    const cardTypeText = getByText("Green Card");
    expect(cardTypeText.props.style).toEqual(
      expect.objectContaining({
        color: theme.cardTypes.green.textColor,
      })
    );
  });

  it("applies 'Black Card' theme when provided", () => {
    const props = {
      ...defaultProps,
      cardType: "Black Card",
      backgroundColor: theme.cardTypes.black.backgroundColor,
      textColor: theme.cardTypes.black.textColor,
    };

    const { getByText, UNSAFE_getByProps } = render(<CreditCard {...props} />);

    const touchableOpacity = UNSAFE_getByProps({ activeOpacity: 0.95 });
    expect(touchableOpacity.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: theme.cardTypes.black.backgroundColor,
      })
    );

    const cardTypeText = getByText("Black Card");
    expect(cardTypeText.props.style).toEqual(
      expect.objectContaining({
        color: theme.cardTypes.black.textColor,
      })
    );
  });
});
