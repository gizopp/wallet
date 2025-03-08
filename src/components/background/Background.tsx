import React, { ReactNode } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import theme from "../../theme/theme";

type BackgroundProps = {
  children: ReactNode;
};

export const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topDecoration}></View>
      <View style={styles.content}>{children}</View>
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
    zIndex: 1,
  },
  topDecoration: {
    position: "absolute",
    top: -30,
    left: -130,
    width: "100%",
    height: 235,
    backgroundColor: theme.colors.lightGray,
    borderRadius: theme.borderRadius.big,
    zIndex: 0,
    transform: [{ rotate: "315deg" }],
    opacity: 0.2,
  },
  bottomDecoration: {
    position: "absolute",
    bottom: -30,
    right: -130,
    width: "100%",
    height: 235,
    backgroundColor: theme.colors.lightGray,
    borderRadius: theme.borderRadius.big,
    zIndex: 0,
    transform: [{ rotate: "315deg" }],
    opacity: 0.2,
  },
});
