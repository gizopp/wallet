import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../../theme/theme";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { TRootStackParamList } from "../navigation/RootStack";
import CustomText from "../text/CustomText";

export const MyCardsHeader = () => {
  const navigation = useNavigation<NavigationProp<TRootStackParamList>>();
  const handleBackPress = () => {
    navigation.navigate("Home");
  };

  const handleAddPress = () => {
    navigation.navigate("RegisterCard");
  };

  return (
    <View style={{ minHeight: 136 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <CustomText
            style={{
              fontSize: theme.fontSize.h2,
              color: theme.colors.lightBlue,
            }}
          >
            ←
          </CustomText>
        </TouchableOpacity>
        <CustomText style={styles.headerTitle}>Wallet Test</CustomText>
        <TouchableOpacity onPress={handleAddPress}>
          <CustomText
            style={{
              fontSize: theme.fontSize.h1,
              color: theme.colors.lightBlue,
            }}
          >
            +
          </CustomText>
        </TouchableOpacity>
      </View>
      <View style={styles.subHeader}>
        <CustomText style={styles.headerSubtitle}>Meus cartões</CustomText>
        <LinearGradient
          style={styles.headerGradient}
          colors={[theme.colors.black, "rgba(0,0,0,0.3)", "transparent"]}
          locations={[0, 0.3, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    height: 66,
    backgroundColor: theme.colors.white,
  },
  subHeader: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: theme.colors.white,
    height: 70,
    borderBottomRightRadius: theme.borderRadius.large,
    borderBottomLeftRadius: theme.borderRadius.large,
    position: "relative",
  },
  headerGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 10,
    zIndex: 1,
    opacity: 0.3,
  },
  headerTitle: {
    fontSize: theme.fontSize.h2,
    color: theme.colors.darkBlue,
  },
  headerSubtitle: {
    fontSize: 20,
    textAlign: "center",
    color: theme.colors.lightBlue,
    zIndex: 2,
  },
});
