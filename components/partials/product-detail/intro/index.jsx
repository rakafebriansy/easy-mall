import { Dimensions } from "react-native";
import { Image, Text, View } from "react-native";
const Intro = ({ product }) => {
  const height = Dimensions.get("window").height;

  return (
    <View>
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
