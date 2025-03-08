import * as React from "react";
import Routes from "./src/routes";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import theme from "./src/theme/theme";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts(theme.fonts);

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
