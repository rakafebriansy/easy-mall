import { Image, Text, View } from "react-native";
import { Colors } from "../../../constants/Colors";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
const ProductCard = ({ product }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/product-detail/${product.id}`)}
      style={{
        backgroundColor: "white",
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      }}
    >
      <Image
        source={{
          uri: product.imageUrl,
        }}
        style={{
          width: "100%",
          height: 150,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      />
      <View
        style={{
          padding: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
          }}
        >
          {product.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            color: Colors.GRAY,
          }}
        >
          {product.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default ProductCard;
