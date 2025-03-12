import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../../theme/theme";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../text/CustomText";

export const RegisterHeader = () => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <CustomText style={styles.backButtonText}>←</CustomText>
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <CustomText style={styles.headerTitle}>cadastro</CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
    position: "relative",
    justifyContent: "center",
    paddingVertical: 10,
  },
  backButton: {
    padding: 8,
    position: "absolute",
    left: 0,
    zIndex: 1,
    marginLeft: 24,
  },
  backButtonText: {
    color: theme.colors.lightBlue,
    fontSize: 24,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    color: theme.colors.lightBlue,
    fontSize: 24,
  },
});
