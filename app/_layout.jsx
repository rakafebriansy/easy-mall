import { ClerkProvider, ClerkLoaded, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import * as SecureStore from 'expo-secure-store'
import { Stack } from "expo-router";
import LoginScreen from "./login";
import Loading from "../components/elements/Utils/Loading";

export default function RootLayout() {
  
  const [fontsLoaded] =  useFonts({
    outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
  });

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

  if(!fontsLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <ClerkProvider 
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ClerkLoaded>
        <SignedIn>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="(tabs)" />
          </Stack>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
