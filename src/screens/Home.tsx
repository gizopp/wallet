import React from "react";
import { View, Text } from "react-native";
import theme from "../theme/theme";
import { TRootStackParamList } from "../components/navigation/RootStack";
import { Button } from "../components/button/Button";
import { Background } from "../components/background/Background";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export const Home: React.FC = () => {
  const navigation = useNavigation<NavigationProp<TRootStackParamList>>();

  return (
    <Background>
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
          onPress={() => navigation.navigate("MyCards")}
        />
        <Button
          text="cadastrar cartão"
          backgroundColor={theme.colors.neon}
          textColor={theme.colors.darkBlue}
          onPress={() => navigation.navigate("RegisterCard")}
        />
      </View>
    </Background>
  );
};
