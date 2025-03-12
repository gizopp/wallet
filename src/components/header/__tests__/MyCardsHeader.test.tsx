import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { MyCardsHeader } from "../MyCardsHeader";

const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

jest.mock("expo-linear-gradient", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require("react-native");
  return {
    LinearGradient: (props: React.ComponentProps<typeof View>) => (
      <View {...props} testID="linear-gradient" />
    ),
  };
});

describe("MyCardsHeader", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders correctly", () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <MyCardsHeader />
      </NavigationContainer>
    );

    expect(getByText("Wallet Test")).toBeTruthy();
    expect(getByText("Meus cartões")).toBeTruthy();
    expect(getByText("←")).toBeTruthy();
    expect(getByText("+")).toBeTruthy();
    expect(getByTestId("linear-gradient")).toBeTruthy();
  });

  it("navigates to Home screen when back button is pressed", () => {
    const { getByText } = render(
      <NavigationContainer>
        <MyCardsHeader />
      </NavigationContainer>
    );

    fireEvent.press(getByText("←"));

    expect(mockNavigate).toHaveBeenCalledWith("Home");
  });

  it("navigates to RegisterCard screen when add button is pressed", () => {
    const { getByText } = render(
      <NavigationContainer>
        <MyCardsHeader />
      </NavigationContainer>
    );

    fireEvent.press(getByText("+"));

    expect(mockNavigate).toHaveBeenCalledWith("RegisterCard");
  });

  it("has the correct styling for header elements", () => {
    const { getByText } = render(
      <NavigationContainer>
        <MyCardsHeader />
      </NavigationContainer>
    );

    const title = getByText("Wallet Test");
    expect(title.props.style).toMatchObject({
      fontSize: expect.any(Number),
      fontFamily: expect.any(String),
      color: expect.any(String),
    });

    const subtitle = getByText("Meus cartões");
    expect(subtitle.props.style).toMatchObject({
      fontSize: 20,
      textAlign: "center",
      fontFamily: expect.any(String),
      color: expect.any(String),
      zIndex: 2,
    });
  });
});
