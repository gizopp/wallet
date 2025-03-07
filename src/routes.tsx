import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./components/navigation/RootStack";

const Routes = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default Routes;
