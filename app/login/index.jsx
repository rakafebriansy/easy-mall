import { Image, Text, View, Dimensions, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Colors";
import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";

const { width, height } = Dimensions.get("window");

WebBrowser.maybeCompleteAuthSession();

const CLIENT_ID = process.env.EXPO_PUBLIC_CLIENT_ID;
const DISCOVERY = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
  revocationEndpoint: "https://oauth2.googleapis.com/revoke",
};

const LoginScreen = ({}) => {
  const redirectUri = makeRedirectUri({
    useProxy: true,
  });
  const [request, response, promptAsync] = useAuthRequest({
      clientId: CLIENT_ID,
      redirectUri,
      scopes: ["openid", "profile", "email"],
      responseType: "id_token",
    }, DISCOVERY);

    useEffect(() => {
      if (response) {
        console.log('Response:', response); // Tambahkan log untuk debug
        if (response.type === 'success') {
          const { id_token } = response.params;
          console.log('ID Token:', id_token);
        } else {
          console.error('Authentication failed:', response);
        }
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
    </View>
  );
};

export default LoginScreen;
