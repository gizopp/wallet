import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import theme from "../theme/theme";
import { Button } from "../components/button/Button";
import { TRootStackParamList } from "../components/navigation/RootStack";

type THomeScreenNavigationProp = StackNavigationProp<
  TRootStackParamList,
  "Home"
>;

export const Home: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topDecoration}></View>
      <View style={styles.content}>
        <Text
          style={{
            fontFamily: theme.fontFamily.regular,
            color: theme.colors.white,
            fontSize: theme.fontSize.h1,
            marginBottom: 4,
          }}
        >
          Wallet Test
        </Text>
        <View style={{ width: "100%", gap: 20, padding: 20 }}>
          <Button
            text="meus cartões"
            backgroundColor={theme.colors.lightBlue}
            textColor={theme.colors.white}
          />
          <Button
            text="cadastrar cartão"
            backgroundColor={theme.colors.neon}
            textColor={theme.colors.darkBlue}
          />
        </View>
      </View>
      <View style={styles.bottomDecoration}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 1,
  },
  buttonPrimary: {
    backgroundColor: "#4fc3f7",
    width: "100%",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonSecondary: {
    backgroundColor: "#c6ff00",
    width: "100%",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000000",
  },
  topDecoration: {
    position: "absolute",
    top: -50,
    left: -120,
    width: 350,
    height: 235,
    backgroundColor: theme.colors.lightGray,
    borderRadius: theme.borderRadius.big,
    zIndex: 0,
    transform: [{ rotate: "315deg" }],
    opacity: 0.2,
  },
  bottomDecoration: {
    position: "absolute",
    bottom: -50,
    right: -120,
    width: 350,
    height: 235,
    backgroundColor: theme.colors.lightGray,
    borderRadius: theme.borderRadius.big,
    zIndex: 0,
    transform: [{ rotate: "315deg" }],
    opacity: 0.2,
  },
});
