import React from "react";
import { View } from "react-native";
import theme from "../../theme/theme";
import { TRootStackParamList } from "../../components/navigation/RootStack";
import { Button } from "../../components/button/Button";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AnimatedBackground } from "../../components/animated/AnimatedScreen";
import CustomText from "../../components/text/CustomText";

export const Home: React.FC = () => {
  const navigation = useNavigation<NavigationProp<TRootStackParamList>>();

  return (
    <AnimatedBackground showHeader={false}>
      <CustomText
        style={{
          color: theme.colors.white,
          fontSize: theme.fontSize.h1,
          marginBottom: 4,
        }}
      >
        Wallet Test
      </CustomText>
      <View style={{ width: "100%", gap: 20, padding: 20 }}>
        <Button
          text="meus cartões"
          backgroundColor={theme.colors.lightBlue}
          textColor={theme.colors.white}
          onPress={() => navigation.navigate("MyCards")}
          testId="myCardsButton"
        />
        <Button
          text="cadastrar cartão"
          backgroundColor={theme.colors.neon}
          textColor={theme.colors.darkBlue}
          onPress={() => navigation.navigate("RegisterCard")}
          testId="registerCardButton"
        />
      </View>
    </AnimatedBackground>
  );
};
