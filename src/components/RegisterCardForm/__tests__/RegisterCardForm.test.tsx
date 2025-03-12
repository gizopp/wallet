import React from "react";
import { render } from "@testing-library/react-native";
import { RegisterCardForm } from "../../../components/RegisterCardForm/RegisterCardForm";
import { Provider } from "react-redux";
import { createStore } from "redux";

const mockGetCards = jest.fn().mockResolvedValue([]);
const mockSaveCard = jest.fn().mockResolvedValue(true);

jest.mock("../../../services/cardService", () => ({
  cardService: {
    getCards: mockGetCards,
    saveCard: mockSaveCard,
  },
}));

jest.mock("../../../utils/showToast", () => ({
  showToast: jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock("../../../store/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn(),
}));

const rootReducer = (state = { card: { currentStep: 0 } }) => state;
const store = createStore(rootReducer);

describe("RegisterCardForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly", () => {
    expect(() => {
      render(
        <Provider store={store}>
          <RegisterCardForm />
        </Provider>
      );
    }).not.toThrow();
  });

  test("contains advance button", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <RegisterCardForm />
      </Provider>
    );
    expect(getByTestId("button-text")).toHaveTextContent("avançar");
  });

  test("displays all required form fields", () => {
    const { getByText } = render(
      <Provider store={store}>
        <RegisterCardForm />
      </Provider>
    );

    expect(getByText("número do cartão")).toBeTruthy();
    expect(getByText("nome do titular do cartão")).toBeTruthy();
    expect(getByText("vencimento")).toBeTruthy();
    expect(getByText("código de segurança")).toBeTruthy();
  });

  test("advance button is disabled by default", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <RegisterCardForm />
      </Provider>
    );

    const button = getByTestId("button-touchable");
    expect(button.props.accessibilityState.disabled).toBe(true);
  });
});
