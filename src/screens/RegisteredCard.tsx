import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import theme from "../theme/theme";
import { Button } from "../components/button/Button";
import { AnimatedBackground } from "../components/animated/AnimatedScreen";
import { CreditCard } from "../components/card/CreditCard";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TRootStackParamList } from "../components/navigation/RootStack";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setShowAnimation, setFormVisible } from "../store/slices/cardSlice";
import CustomText from "../components/text/CustomText";

export const RegisteredCard: React.FC = () => {
  const navigation = useNavigation<NavigationProp<TRootStackParamList>>();
  const dispatch = useAppDispatch();
  const {
    cardNumber,
    cardHolder,
    validity,
    backgroundColor,
    textColor,
    cardType,
  } = useAppSelector((state) => state.card);

  useEffect(() => {
    dispatch(setShowAnimation(false));
    dispatch(setFormVisible(true));
  }, [dispatch]);

  const handleAdvance = () => {
    navigation.navigate("MyCards");
  };

  return (
    <AnimatedBackground showAnimation={false}>
      <View style={styles.screenContent}>
        <View style={styles.absoluteFormContainer}>
          <CustomText style={styles.mainTitle}>Wallet Test</CustomText>
          <CustomText style={styles.subTitle}>
            cartão cadastrado com sucesso
          </CustomText>
          <CreditCard
            cardHolder={cardHolder}
            cardNumber={cardNumber}
            validity={validity}
            cardType={cardType}
            backgroundColor={backgroundColor}
            textColor={textColor}
          />
          <Button
            text="avançar"
            backgroundColor={theme.colors.lightBlue}
            textColor={theme.colors.white}
            onPress={handleAdvance}
          />
        </View>
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
    marginBottom: 8,
    textAlign: "center",
  },
  subTitle: {
    color: theme.colors.white,
    fontSize: theme.fontSize.h3,
    marginBottom: 8,
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
