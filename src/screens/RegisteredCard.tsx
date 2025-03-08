import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../theme/theme";
import { Button } from "../components/button/Button";
import { Header } from "../components/header/Header";
import { AnimatedBackground } from "../components/animated/AnimatedScreen";
import { BlackCard } from "../components/card/BlackCard";

export const RegisteredCard: React.FC = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [formVisible, setFormVisible] = useState(true);

  const handleAdvance = () => {
    setFormVisible(false);
    setShowAnimation(true);
  };

  const handleAnimationComplete = () => {
    console.log("Animation completed");
  };

  return (
    <AnimatedBackground
      showAnimation={showAnimation}
      onAnimationComplete={handleAnimationComplete}
    >
      <Header />
      <View style={styles.screenContent}>
        {formVisible && (
          <View style={styles.absoluteFormContainer}>
            <Text style={styles.mainTitle}>Wallet Test</Text>
            <Text style={styles.subTitle}>cartão cadastrado com sucesso</Text>
            <BlackCard />
            <Button
              text="avançar"
              backgroundColor={theme.colors.lightBlue}
              textColor={theme.colors.white}
              onPress={handleAdvance}
            />
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
    marginBottom: 8,
    textAlign: "center",
  },
  subTitle: {
    color: theme.colors.white,
    fontSize: theme.fontSize.h3,
    fontFamily: theme.fontFamily.regular,
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
