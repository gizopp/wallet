import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../../screens/Home";

export type TRootStackParamList = {
  Home: undefined;
};

const Stack = createStackNavigator<TRootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#1a237e" },
      }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default RootStack;
