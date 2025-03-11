import React from "react";
import { render, screen } from "@testing-library/react-native";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "../FormInput";

const FormInputWrapper = ({ children }) => {
  const methods = useForm({
    defaultValues: {
      cardHolder: "",
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
          labelColor="#FF0000"
          placeholder=""
        />
      </FormInputWrapper>
    );
  });
});
