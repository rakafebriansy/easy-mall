import { useFonts } from "expo-font";
import * as SecureStore from "expo-secure-store";
import { Stack } from "expo-router";
import Loading from "../components/elements/Utils/Loading";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
  });
  const linking = {
    prefixes: ["https://myapp.com", "myapp://"],
    config: {
      screens: {
        "(tabs)": {
          screens: {
            home: "",
            profile: "profile",
            explore: "explore",
          },
        },
        login: "login/index",
      },
    },
  };



  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }} initialRouteName="login"
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="login/index" />
    </Stack>
  );
}
