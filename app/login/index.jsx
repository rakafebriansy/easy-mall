import { Image, Text, View, Dimensions, TouchableOpacity, Button, ToastAndroid } from "react-native";
import { Colors } from "../../constants/Colors";
import React, { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { User } from "../../context/User";
import { useRouter } from "expo-router";

GoogleSignin.configure({
  webClientId: '923905482587-3rmrc7dlng24f4pem3qsmmkc6kjngji6.apps.googleusercontent.com',
});

const { width, height } = Dimensions.get("window");

const LoginScreen = ({}) => {
  const router = useRouter();
  const { user, setUser } = useContext(User);

  const handleGoogleSignIn = async () => {
    try {
      // // with google sign in
      // await GoogleSignin.hasPlayServices();
      // const userInfo = await GoogleSignin.signIn();
      // await AsyncStorage.setItem("@user", JSON.stringify(userInfo));
      // setUser(userInfo.data.user);

      // bypass
      setUser({
        name: 'Test',
        email: 'user@example.com',
        photo: 'https://cdn-icons-png.flaticon.com/512/64/64572.png '
      });

      router.push('home');
    } catch (error) {
      console.error(error.message);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

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
        onPress={() => handleGoogleSignIn()}
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
