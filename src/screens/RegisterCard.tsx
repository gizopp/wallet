import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../theme/theme";
import { Button } from "../components/button/Button";
import { Input } from "../components/input/Input";
import { RegisterHeader } from "../components/header/RegisterHeader";
import { AnimatedBackground } from "../components/animated/AnimatedScreen";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TRootStackParamList } from "../components/navigation/RootStack";

export const RegisterCard: React.FC = () => {
  const navigation = useNavigation<NavigationProp<TRootStackParamList>>();
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);
  const [formVisible, setFormVisible] = useState(true);

  const handleAdvance = () => {
    setFormVisible(false);
    setShowAnimation(true);
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
            <View style={{ gap: 32 }}>
              <Input
                label="número do cartão"
                labelColor={theme.colors.lightGray}
                value={cardNumber}
                onChangeText={setCardNumber}
                placeholder=""
                keyboardType="numeric"
                leftIcon={require("../../assets/images/camera-icon.png")}
                mask="9999 9999 9999 9999"
              />
              <Input
                label="nome do titular do cartão"
                value={cardholderName}
                onChangeText={setCardholderName}
                placeholder=""
              />
              <View style={styles.rowInputs}>
                <View style={styles.halfInput}>
                  <Input
                    label="vencimento"
                    value={expiryDate}
                    onChangeText={setExpiryDate}
                    placeholder="00/00"
                    keyboardType="numeric"
                    maxLength={5}
                    mask="99/99"
                  />
                </View>
                <View style={styles.halfInput}>
                  <Input
                    label="código de segurança"
                    value={securityCode}
                    onChangeText={setSecurityCode}
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
                onPress={handleAdvance}
              />
            </View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: theme.colors.lightBlue,
    fontSize: 24,
  },
  headerTitle: {
    color: theme.colors.lightBlue,
    fontSize: 24,
    marginLeft: 15,
    fontFamily: theme.fontFamily.regular,
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
