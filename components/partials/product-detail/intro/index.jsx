import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Dimensions, TouchableOpacity } from "react-native";
import { Image, Text, View } from "react-native";
const Intro = ({ product }) => {
  const router = useRouter();
  const { height, width } = Dimensions.get("window");

  return (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 20,
          paddingTop: 40,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons size={40} name="arrow-back-circle" color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons size={40} name="heart-outline" color={"white"} />
        </TouchableOpacity>
      </View>
      <Image
        source={{
          uri: product.imageUrl,
        }}
        style={{
          width: "100%",
          height: (height * 2) / 5,
        }}
      />
      <View
        style={{
          paddingTop: 20,
          paddingBottom: 10,
          paddingHorizontal: 20,
          marginTop: -20,
          backgroundColor: "white",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontFamily: "outfit-bold",
          }}
        >
          {product.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 16,
          }}
        >
          {product.address}
        </Text>
      </View>
    </View>
  );
};
export default Intro;
