import { Image, Text, View, Dimensions, TouchableOpacity, Button, ToastAndroid } from "react-native";
import { Colors } from "../../constants/Colors";
import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as AuthSession from "expo-auth-session";

const { width, height } = Dimensions.get("window");

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({}) => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);

  //

  const redirectUri = AuthSession.makeRedirectUri({
    scheme: "myapp",
    useProxy: false,
  });

  console.log(redirectUri);
  //

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  });

  const handleGoogleSignIn = async () => {
    try {
      const user = await AsyncStorage.getItem("@user");
      if (!user) {
        if (response.type === "success") {
          await getUserInfo(response.authentication.accessToken);
        }
      } else {
        setUserInfo(JSON.parse(user));
      }
    } catch (error) {
      console.error(error);
      ToastAndroid.show("Failed to Login", ToastAndroid.SHORT);
    }
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    if (response) {
      handleGoogleSignIn();
    }
  }, [response]);

  return (
    <View
      style={{
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        flex: 1,
      }}
    >
      <View
        style={{
          alignItems: "center",
          height: (60 / 100) * height,
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../assets/images/ui.jpg")}
          style={{
            width: 200,
            height: 400,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: "#000",
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: "#FFF",
          padding: 20,
          marginTop: -30,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontFamily: "outfit-bold",
            textAlign: "center",
          }}
        >
          Your Ultimate{" "}
          <Text
            style={{
              color: Colors.PRIMARY,
            }}
          >
            Community Mall
          </Text>{" "}
          App
        </Text>
        <Text>{JSON.stringify(userInfo)}</Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "outfit",
            textAlign: "center",
            marginVertical: 15,
            color: Colors.GRAY,
          }}
        >
          Find your favorite products near you and post your own beloved product to your community
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => promptAsync()}
        style={{
          width: (80 / 100) * width,
          marginTop: 20,
          backgroundColor: Colors.PRIMARY,
          padding: 16,
          borderRadius: 99,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontFamily: "outfit",
          }}
        >
          Let's Get Started
        </Text>
      </TouchableOpacity>
      <Button title="delete" onPress={() => AsyncStorage.removeItem("@user")}></Button>
    </View>
  );
};

export default LoginScreen;
