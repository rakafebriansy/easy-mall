import { Image, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "../../../constants/Colors";
import { useRouter } from "expo-router";

const ProductListItem = ({ product }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/product-detail/${product.id}`)}
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 30,
        backgroundColor: "white",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <Image
        source={{
          uri: product.imageUrl,
        }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 20,
        }}
      />
      <View
        style={{
          flex: 1,
          gap: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 17,
          }}
        >
          {product.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            color: Colors.GRAY,
            fontSize: 13,
          }}
        >
          {product.address}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 5,
            }}
          >
            <Image
              style={{
                width: 15,
                height: 15,
              }}
              source={require("../../../assets/images/star.png")}
            />
            <Text
              style={{
                fontFamily: "outfit",
              }}
            >
              4.5
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ProductListItem;
