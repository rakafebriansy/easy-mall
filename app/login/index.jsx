import { Image, Text, View, Dimensions, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Colors";
import React from 'react'
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";

const {width, height} = Dimensions.get("window");
WebBrowser.maybeCompleteAuthSession()

const LoginScreen = ({}) => {
  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      })

      if (createdSessionId) {
        setActive({ session: createdSessionId })
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, []);

  return (
    <View style={{
      justifyContent: 'center',
      display: 'flex',
      alignItems: 'center',
      flex: 1
    }}>
      <View
        style={{
          alignItems: 'center',
          height: (60 / 100) * height,
          justifyContent: 'center',
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
      <View style={{
        backgroundColor: '#FFF',
        padding: 20,
        marginTop: -30,
      }}>
        <Text style={{
          fontSize: 30,
          fontFamily: 'outfit-bold',
          textAlign: 'center'
        }}>Your Ultimate <Text style={{
          color: Colors.PRIMARY
        }}>Community Mall</Text> App</Text>
        <Text style={{
          fontSize: 15,
          fontFamily: 'outfit',
          textAlign: 'center',
          marginVertical: 15,
          color: Colors.GRAY
        }}>Find your favorite products near you and post your own beloved product to your community</Text>
      </View>
      <TouchableOpacity onPress={onPress} style={{
          width: 80/100 * width,
          marginTop: 20,
          backgroundColor: Colors.PRIMARY,
          padding: 16,
          borderRadius: 99
        }}>
        <Text style={{
          textAlign: 'center',
          color: 'white',
          fontFamily: 'outfit'
        }} >Let's Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
