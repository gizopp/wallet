import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { RegisterHeader } from "../RegisterHeader";

const mockGoBack = jest.fn();
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      goBack: mockGoBack,
    }),
  };
});

describe("RegisterHeader", () => {
  beforeEach(() => {
    mockGoBack.mockClear();
  });

  it("renders correctly", () => {
    const { getByText } = render(
      <NavigationContainer>
        <RegisterHeader />
      </NavigationContainer>
    );

    expect(getByText("cadastro")).toBeTruthy();
    expect(getByText("←")).toBeTruthy();
  });

  it("navigates back when back button is pressed", () => {
    const { getByText } = render(
      <NavigationContainer>
        <RegisterHeader />
      </NavigationContainer>
    );

    fireEvent.press(getByText("←"));

    expect(mockGoBack).toHaveBeenCalled();
  });

  it("has the correct styling for header elements", () => {
    const { getByText } = render(
      <NavigationContainer>
        <RegisterHeader />
      </NavigationContainer>
    );

    const title = getByText("cadastro");
    expect(title.props.style).toMatchObject({
      color: expect.any(String),
      fontSize: 24,
      fontFamily: expect.any(String),
    });

    const backButton = getByText("←");
    expect(backButton.props.style).toMatchObject({
      color: expect.any(String),
      fontSize: 24,
    });
  });
});
