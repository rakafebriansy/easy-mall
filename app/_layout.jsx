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
            home: "", // Sesuaikan dengan path sebenarnya
            profile: "profile",
            explore: "explore",
          },
        },
        login: "login", // Sesuaikan dengan path sebenarnya
      },
    },
  };

  const tokenCache = {
    async getToken(key) {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log("No values stored under key: " + key);
        }
        return item;
      } catch (error) {
        console.error("SecureStore get item error: ", error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    async saveToken(key, value) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error("Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env");
  }

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
      <Stack.Screen name="login" />
    </Stack>
  );
}
