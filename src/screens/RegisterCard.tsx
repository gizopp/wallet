import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import theme from "../theme/theme";
import { TRootStackParamList } from "../components/navigation/RootStack";
import { Button } from "../components/button/Button";
import { Background } from "../components/background/Background";
import { Input } from "../components/input/Input";

type TRegisterCardScreenNavigationProp = StackNavigationProp<
  TRootStackParamList,
  "RegisterCard"
>;

export const RegisterCard: React.FC = () => {
  const navigation = useNavigation<TRegisterCardScreenNavigationProp>();
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <Background>
      <View style={styles.screenContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>cadastro</Text>
        </View>

        <View style={styles.absoluteFormContainer}>
          <Text style={styles.mainTitle}>Wallet Test</Text>
          <View>
            <Input
              label="número do cartão"
              value={cardNumber}
              onChangeText={setCardNumber}
              placeholder=""
              keyboardType="numeric"
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
                />
              </View>
            </View>
            <Button
              text="avançar"
              backgroundColor={theme.colors.lightBlue}
              textColor={theme.colors.white}
            />
          </View>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  screenContent: {
    flex: 1,
    width: "100%",
  },
  header: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
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
    bottom: 0,
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
