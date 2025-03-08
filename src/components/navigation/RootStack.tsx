import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../../screens/Home";
import { RegisterCard } from "../../screens/RegisterCard";
import theme from "../../theme/theme";
import { RegisteredCard } from "../../screens/RegisteredCard";

export type TRootStackParamList = {
  Home: undefined;
  RegisterCard: undefined;
  RegisteredCard: undefined;
};

const Stack = createStackNavigator<TRootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.darkBlue },
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="RegisterCard" component={RegisterCard} />
      <Stack.Screen name="RegisteredCard" component={RegisteredCard} />
    </Stack.Navigator>
  );
};

export default RootStack;
