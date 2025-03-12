import React, { ReactNode } from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { createStackNavigator } from "@react-navigation/stack";
import theme from "../../../theme/theme";
import { Home } from "../Home";

jest.mock(
  "react-native-gesture-handler/lib/commonjs/RNGestureHandlerModule",
  () => ({
    default: {
      State: {},
      attachGestureHandler: jest.fn(),
      createGestureHandler: jest.fn(),
      dropGestureHandler: jest.fn(),
      updateGestureHandler: jest.fn(),
      forceTouchAvailable: jest.fn(),
      enableGestureHandlerSystemFallback: jest.fn(),
      install: jest.fn(),
    },
  })
);

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock("react-native-gesture-handler", () => {
  const View = require("react-native").View;
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    FlatList: View,
    gestureHandlerRootHOC: jest
      .fn()
      .mockImplementation((Component) => Component),
    Directions: {},
    GestureHandlerRootView: View,
  };
});

jest.mock("react-hook-form", () => ({
  useForm: () => ({
    control: {},
    handleSubmit: jest.fn(),
    formState: { errors: {} },
    register: jest.fn(),
    setValue: jest.fn(),
    getValues: jest.fn(),
    watch: jest.fn(),
    reset: jest.fn(),
    trigger: jest.fn(),
  }),
  Controller: ({ render }) =>
    render({ field: { value: "", onChange: jest.fn(), onBlur: jest.fn() } }),
}));

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

jest.mock("../../../components/animated/AnimatedScreen", () => ({
  AnimatedBackground: ({ children }: { children: ReactNode }) => (
    <>{children}</>
  ),
}));

describe("Home Screen", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    jest.clearAllMocks();
  });

  const renderHomeComponent = () => {
    return render(<Home />);
  };

  it("renders correctly", () => {
    const { getByText } = renderHomeComponent();
    expect(getByText("Wallet Test")).toBeTruthy();
    expect(getByText("meus cartões")).toBeTruthy();
    expect(getByText("cadastrar cartão")).toBeTruthy();
  });

  it("has correct styling for title", () => {
    const { getByText } = renderHomeComponent();
    const titleElement = getByText("Wallet Test");
    expect(titleElement.props.style).toEqual({
      fontFamily: theme.fontFamily.regular,
      color: theme.colors.white,
      fontSize: theme.fontSize.h1,
      marginBottom: 4,
    });
  });

  it('navigates to MyCards screen when "meus cartões" button is pressed', () => {
    const { getByText } = renderHomeComponent();
    const myCardsButton = getByText("meus cartões");
    fireEvent.press(myCardsButton);
    expect(mockNavigate).toHaveBeenCalledWith("MyCards");
  });

  it('navigates to RegisterCard screen when "cadastrar cartão" button is pressed', () => {
    const { getByText } = renderHomeComponent();
    const registerCardButton = getByText("cadastrar cartão");
    fireEvent.press(registerCardButton);
    expect(mockNavigate).toHaveBeenCalledWith("RegisterCard");
  });

  it('verifies button styling for "meus cartões" button', () => {
    const { getByTestId } = renderHomeComponent();
    const myCardsButton = getByTestId("myCardsButton");
    expect(myCardsButton.props.style).toHaveProperty(
      "backgroundColor",
      theme.colors.lightBlue
    );
  });

  it('verifies button styling for "cadastrar cartão" button', () => {
    const { getByTestId } = renderHomeComponent();
    const registerCardButton = getByTestId("registerCardButton");
    expect(registerCardButton.props.style).toHaveProperty(
      "backgroundColor",
      theme.colors.neon
    );
  });
});
