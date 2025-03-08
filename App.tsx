import * as React from "react";
import Routes from "./src/routes";
import { useFonts } from "expo-font";
import {
  PTSansCaption_400Regular,
  PTSansCaption_700Bold,
} from "@expo-google-fonts/pt-sans-caption";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    PTSansCaption_400Regular,
    PTSansCaption_700Bold,
  });

  React.useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <Routes />;
}
