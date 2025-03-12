import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "../Button";
import theme from "../../../theme/theme";

describe("Button", () => {
  it("renders correctly with default props", () => {
    const { getByText } = render(<Button text="avançar" />);

    expect(getByText("avançar")).toBeTruthy();
  });

  it("applies correct default styling", () => {
    const { getByText } = render(<Button text="Style Test" />);

    const button = getByText("Style Test");

    expect(button.props.style.color).toBe(theme.colors.white);
  });

  it("calls onPress handler when pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button text="avançar" onPress={onPressMock} />
    );

    fireEvent.press(getByText("avançar"));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("has correct disabled appearance", () => {
    const { getByText } = render(
      <Button text="disabled button" disabled={true} />
    );

    const buttonText = getByText("disabled button");

    expect(buttonText.props.style.color).toBe(theme.colors.lightGray);
  });

  it("does not call onPress when disabled", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button text="disabled button" onPress={onPressMock} disabled={true} />
    );

    fireEvent.press(getByText("disabled button"));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("renders with long text correctly", () => {
    const longText =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry";
    const { getByText } = render(<Button text={longText} />);

    const buttonText = getByText(longText);

    expect(buttonText).toBeTruthy();
    expect(buttonText.props.children).toBe(longText);
  });

  it("handles undefined onPress prop", () => {
    const { getByText } = render(<Button text="No Handler" />);

    fireEvent.press(getByText("No Handler"));
    expect(true).toBe(true);
  });
});
