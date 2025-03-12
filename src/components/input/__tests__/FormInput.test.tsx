import React, { ReactNode } from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react-native";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "../FormInput";
import { Image } from "react-native";
import theme from "../../../theme/theme";

jest.mock("../../../../assets/images/camera-icon.png", () => "mocked-icon");

const FormInputWrapper = ({
  children,
  defaultValues = {},
}: {
  children: ReactNode;
  defaultValues?: Record<string, any>;
}) => {
  const methods = useForm({
    defaultValues: {
      cardHolder: "",
      ...defaultValues,
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("FormInput", () => {
  test("renders correctly with required props", () => {
    render(
      <FormInputWrapper>
        <FormInput
          name="cardHolder"
          label="nome do titular do cartão"
          placeholder=""
        />
      </FormInputWrapper>
    );
    const labelElement = screen.getByText("nome do titular do cartão");
    expect(labelElement).toBeTruthy();
  });

  test("applies custom label color when provided", () => {
    render(
      <FormInputWrapper>
        <FormInput
          name="cardHolder"
          label="nome do titular do cartão"
          labelColor={theme.colors.darkBlue}
          placeholder=""
        />
      </FormInputWrapper>
    );
    const labelElement = screen.getByText("nome do titular do cartão");
    expect(labelElement.props.style).toEqual(
      expect.objectContaining({
        color: theme.colors.darkBlue,
      })
    );
  });

  test("renders with a left icon when provided", () => {
    const iconSource = { uri: "mocked-icon" };

    render(
      <FormInputWrapper>
        <FormInput
          name="cardHolder"
          label="nome do titular do cartão"
          leftIcon={iconSource}
          placeholder=""
        />
      </FormInputWrapper>
    );

    const imageElement = screen.UNSAFE_getByType(Image);
    expect(imageElement).toBeTruthy();
    expect(imageElement.props.source).toEqual(iconSource);
  });

  test("updates form value when text is entered", async () => {
    const { getByPlaceholderText } = render(
      <FormInputWrapper>
        <FormInput
          name="cardHolder"
          label="nome do titular do cartão"
          placeholder="Digite o nome"
        />
      </FormInputWrapper>
    );

    const inputElement = getByPlaceholderText("Digite o nome");

    await act(async () => {
      fireEvent.changeText(inputElement, "John Doe");
    });

    await waitFor(() => {
      expect(inputElement.props.value).toBe("John Doe");
    });
  });

  test("applies mask when mask prop is provided", async () => {
    const { getByPlaceholderText } = render(
      <FormInputWrapper>
        <FormInput
          name="cardNumber"
          label="Número do cartão"
          placeholder="0000 0000 0000 0000"
          mask="9999 9999 9999 9999"
        />
      </FormInputWrapper>
    );

    const input = getByPlaceholderText("0000 0000 0000 0000");

    await act(async () => {
      fireEvent.changeText(input, "4111111111111111");
    });

    await waitFor(() => {
      expect(input.props.value).toBe("4111 1111 1111 1111");
    });
  });

  test("initializes with default value when provided", async () => {
    const { getByDisplayValue } = render(
      <FormInputWrapper defaultValues={{ cardHolder: "John Doe" }}>
        <FormInput
          name="cardHolder"
          label="nome do titular do cartão"
          placeholder=""
        />
      </FormInputWrapper>
    );

    await waitFor(() => {
      const input = getByDisplayValue("John Doe");
      expect(input).toBeTruthy();
    });
  });

  test("calls register on mount", async () => {
    const mockRegister = jest.fn();
    const mockSetValue = jest.fn();
    const mockWatch = jest.fn(() => "");

    const MockFormProvider = ({ children }: { children: ReactNode }) => {
      const formContextValue = {
        register: mockRegister,
        setValue: mockSetValue,
        watch: mockWatch,
        formState: { errors: {} },
      };

      return (
        <FormProvider {...(formContextValue as any)}>{children}</FormProvider>
      );
    };

    render(
      <MockFormProvider>
        <FormInput
          name="cardHolder"
          label="nome do titular do cartão"
          placeholder=""
        />
      </MockFormProvider>
    );

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith("cardHolder");
    });
  });

  test("handles disabled state correctly", () => {
    const { getByTestId } = render(
      <FormInputWrapper>
        <FormInput
          name="cardHolder"
          label="nome do titular do cartão"
          placeholder=""
          editable={false}
          testID="input-field"
        />
      </FormInputWrapper>
    );

    const input = getByTestId("input-field");
    expect(input.props.editable).toBe(false);
  });

  test("displays error message when error is present", async () => {
    const MockFormProviderWithError = ({
      children,
    }: {
      children: ReactNode;
    }) => {
      const methods = useForm({
        defaultValues: {
          cardHolder: "",
        },
      });

      const formState = {
        ...methods.formState,
        errors: {
          cardHolder: {
            type: "required",
            message: "Este campo é obrigatório",
          },
        },
      };

      return (
        <FormProvider {...{ ...methods, formState }}>{children}</FormProvider>
      );
    };

    const { getByText } = render(
      <MockFormProviderWithError>
        <FormInput
          name="cardHolder"
          label="nome do titular do cartão"
          placeholder=""
        />
      </MockFormProviderWithError>
    );

    await waitFor(() => {
      const errorMessage = getByText("Este campo é obrigatório");
      expect(errorMessage).toBeTruthy();
    });
  });
});
