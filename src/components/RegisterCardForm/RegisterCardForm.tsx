import React, { useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import theme from "../../theme/theme";
import { Button } from "../../components/button/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setCardNumber,
  setCardHolder,
  setValidity,
  setCvv,
  handleAdvance,
} from "../../store/slices/cardSlice";
import { cardService } from "../../services/cardService";
import { FormInput } from "../../components/input/FormInput";
import { showToast } from "../../utils/showToast";

const cardValidationSchema = z.object({
  cardNumber: z.string().length(19, "número do cartão completo é obrigatório"),
  cardHolder: z.string().trim().min(1, "nome do titular é obrigatório"),
  validity: z
    .string()
    .length(5, "vencimento é obrigatório")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "formato deve ser MM/AA")
    .refine(
      (value) => {
        const [month, year] = value.split("/");
        const expDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
        const today = new Date();
        today.setDate(1);
        today.setHours(0, 0, 0, 0);
        return expDate >= today;
      },
      { message: "cartão expirado" }
    ),
  cvv: z.string().length(3, "CVV é obrigatório"),
});

export type RegisterCardFormData = z.infer<typeof cardValidationSchema>;

interface RegisterCardFormProps {
  onSubmitSuccess?: () => void;
}

export const RegisterCardForm: React.FC<RegisterCardFormProps> = ({
  onSubmitSuccess,
}) => {
  const dispatch = useAppDispatch();

  const formMethods = useForm<RegisterCardFormData>({
    resolver: zodResolver(cardValidationSchema),
    mode: "all",
    defaultValues: {
      cardNumber: "",
      cardHolder: "",
      validity: "",
      cvv: "",
    },
  });

  const {
    handleSubmit,
    watch,
    formState: { isValid, isSubmitting },
  } = formMethods;

  useEffect(() => {
    const subscription = watch((values) => {
      if (values.cardNumber !== undefined) {
        dispatch(setCardNumber(values.cardNumber));
      }
      if (values.cardHolder !== undefined) {
        dispatch(setCardHolder(values.cardHolder));
      }
      if (values.validity !== undefined) {
        dispatch(setValidity(values.validity));
      }
      if (values.cvv !== undefined) {
        dispatch(setCvv(values.cvv));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  const onSubmit = async (data: RegisterCardFormData) => {
    try {
      const existingCards = await cardService.getCards();

      if (existingCards.length >= 3) {
        showToast({
          title: "Erro",
          message:
            "Limite máximo de 3 cartões atingido. Por favor, exclua um cartão antes de adicionar um novo.",
        });
        return null;
      }

      await cardService.saveCard(data, dispatch);

      dispatch(handleAdvance());

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      Alert.alert("Erro", "Erro ao salvar dados do cartão. Tente novamente.", [
        { text: "OK" },
      ]);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <View style={{ gap: 32 }}>
        <FormInput
          name="cardNumber"
          label="número do cartão"
          labelColor={theme.colors.lightGray}
          placeholder=""
          keyboardType="numeric"
          leftIcon={require("../../../assets/images/camera-icon.png")}
          mask="9999 9999 9999 9999"
        />

        <FormInput
          name="cardHolder"
          label="nome do titular do cartão"
          placeholder=""
        />

        <View style={styles.rowInputs}>
          <View style={styles.halfInput}>
            <FormInput
              name="validity"
              label="vencimento"
              placeholder="00/00"
              keyboardType="numeric"
              maxLength={5}
              mask="99/99"
            />
          </View>
          <View style={styles.halfInput}>
            <FormInput
              name="cvv"
              label="código de segurança"
              placeholder="•••"
              keyboardType="numeric"
              secureTextEntry={true}
              maxLength={3}
              mask="999"
            />
          </View>
        </View>

        <Button
          text="avançar"
          backgroundColor={theme.colors.lightBlue}
          textColor={theme.colors.white}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || isSubmitting}
        />
      </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  rowInputs: {
    flexDirection: "row",
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
});
