import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import theme from "../theme/theme";
import { Button } from "../components/button/Button";
import { AnimatedBackground } from "../components/animated/AnimatedScreen";
import { TRootStackParamList } from "../components/navigation/RootStack";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  setCardNumber,
  setCardHolder,
  setValidity,
  setCvv,
  handleAdvance,
} from "../store/slices/cardSlice";
import { cardService } from "../services/cardService";
import { FormInput } from "../components/input/FormInput";

const cardValidationSchema = z.object({
  cardNumber: z.string().length(19, "número do cartão completo é obrigatório"),
  cardHolder: z.string().trim().min(1, "nome do titular é obrigatório"),
  validity: z.string().length(5, "vencimento é obrigatório"),
  cvv: z.string().length(3, "CVV é obrigatório"),
});

type CardFormData = z.infer<typeof cardValidationSchema>;

export const RegisterCard: React.FC = () => {
  const navigation = useNavigation<NavigationProp<TRootStackParamList>>();
  const dispatch = useAppDispatch();
  const { showAnimation, formVisible } = useAppSelector((state) => state.card);

  const formMethods = useForm<CardFormData>({
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

  const onSubmit = async (data: CardFormData) => {
    try {
      await cardService.saveCard(data);
      dispatch(handleAdvance());
    } catch (error) {
      Alert.alert("Erro", "Erro ao salvar dados do cartão. Tente novamente.", [
        { text: "OK" },
      ]);
    }
  };

  const handleAnimationComplete = () => {
    navigation.navigate("RegisteredCard");
  };

  return (
    <AnimatedBackground
      showAnimation={showAnimation}
      onAnimationComplete={handleAnimationComplete}
    >
      <View style={styles.screenContent}>
        {formVisible && (
          <View style={styles.absoluteFormContainer}>
            <Text style={styles.mainTitle}>Wallet Test</Text>
            <FormProvider {...formMethods}>
              <View style={{ gap: 32 }}>
                <FormInput
                  name="cardNumber"
                  label="número do cartão"
                  labelColor={theme.colors.lightGray}
                  placeholder=""
                  keyboardType="numeric"
                  leftIcon={require("../../assets/images/camera-icon.png")}
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
                      placeholder="***"
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
          </View>
        )}
      </View>
    </AnimatedBackground>
  );
};

const styles = StyleSheet.create({
  screenContent: {
    flex: 1,
    width: "100%",
  },
  absoluteFormContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 40,
    justifyContent: "center",
  },
  mainTitle: {
    color: theme.colors.white,
    fontSize: theme.fontSize.h1,
    fontFamily: theme.fontFamily.regular,
    marginBottom: 30,
    textAlign: "center",
  },
  rowInputs: {
    flexDirection: "row",
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
});
