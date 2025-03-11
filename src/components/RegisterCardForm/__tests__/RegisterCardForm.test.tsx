import React from "react";
import { render } from "@testing-library/react-native";
import { RegisterCardForm } from "../../../components/RegisterCardForm/RegisterCardForm";
import { Provider } from "react-redux";
import { createStore } from "redux";

jest.mock("../../../services/cardService", () => ({
  cardService: {
    getCards: jest.fn().mockResolvedValue([]),
    saveCard: jest.fn().mockResolvedValue(true),
  },
}));

jest.mock("../../../utils/showToast", () => ({
  showToast: jest.fn(),
}));

const rootReducer = (state = { card: { currentStep: 0 } }) => state;

const store = createStore(rootReducer);

describe("RegisterCardForm", () => {
  test("renderiza sem quebrar", () => {
    expect(() => {
      render(
        <Provider store={store}>
          <RegisterCardForm />
        </Provider>
      );
    }).not.toThrow();
  });

  test("contém botão de avançar", () => {
    const { getByText } = render(
      <Provider store={store}>
        <RegisterCardForm />
      </Provider>
    );

    expect(getByText("avançar")).toBeTruthy();
  });
});
