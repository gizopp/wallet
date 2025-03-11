import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import theme from "../theme/theme";
import { AnimatedBackground } from "../components/animated/AnimatedScreen";
import { TRootStackParamList } from "../components/navigation/RootStack";
import { useAppSelector } from "../store/hooks";
import { RegisterCardForm } from "../components/RegisterCardForm/RegisterCardForm";

export const RegisterCard: React.FC = () => {
  const navigation = useNavigation<NavigationProp<TRootStackParamList>>();
  const { showAnimation, formVisible } = useAppSelector((state) => state.card);

  const handleAnimationComplete = () => {
    navigation.navigate("RegisteredCard");
  };

  return (
    <AnimatedBackground
      showAnimation={showAnimation}
      onAnimationComplete={handleAnimationComplete}
    >
      {formVisible && (
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={styles.screenContent}
        >
          <View style={styles.absoluteFormContainer}>
            <Text style={styles.mainTitle}>Wallet Test</Text>
            <RegisterCardForm />
          </View>
        </TouchableWithoutFeedback>
      )}
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
});
