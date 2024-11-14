import { Image, Text, View } from "react-native";
import { Colors } from "../../../constants/Colors";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
const PopularProductCard = ({ product, index }) => {
  
  const router = useRouter();

  return (
    <TouchableOpacity
    onPress={() => router.push(`/product-detail/${product.id}`)}
      style={{
        alignItems: "center",
        marginLeft: index === 0 ? 20 : 0,
        marginRight: 20,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 15,
      }}
    >
      <Image
        source={{
          uri: product.imageUrl,
        }}
        style={{
          width: 200,
          height: 120,
          borderRadius: 9,
        }}
      />
      <View
        style={{
          marginTop: 5,
          gap: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 15,
          }}
        >
          {product.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 10,
            color: Colors.GRAY,
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
          <View
            style={{
              backgroundColor: Colors.PRIMARY,
              paddingHorizontal: 5,
              paddingVertical: 2,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 8,
                fontFamily: "outfit",
                color: "white",
              }}
            >
              {product.category}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default PopularProductCard;
