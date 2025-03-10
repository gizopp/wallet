import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./components/navigation/RootStack";
import { CustomToast } from "./utils/showToast";
import { SafeAreaView } from "react-native";

const Routes = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
        <CustomToast />
      </NavigationContainer>
    </Provider>
  );
};

export default Routes;
