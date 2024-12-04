import { Ionicons } from "@expo/vector-icons";
import { Alert, ToastAndroid, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { Image, Text, View } from "react-native";
import { deleteRecord } from "../../../../services";
import { useRouter } from "expo-router";

const Intro = ({ product, user }) => {
  const router = useRouter();
  const height = Dimensions.get("window").height;
  const onDeleteProduct = () => {
    Alert.alert("Do you want to delete?", "Do you really want to delete this product?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: deleteProduct,
      },
    ]);
  };

  const deleteProduct = async () => {
    try {
      await deleteRecord("product-list", product.id);
      router.back();
      ToastAndroid.show("Product Deleted Successfully", ToastAndroid.LONG);
    } catch (err) {
      console.log(err);
      ToastAndroid.show("Error while deleting the product", ToastAndroid.SHORT);
    }
  };

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
          paddingBottom: 15,
          paddingHorizontal: 20,
          marginTop: -20,
          backgroundColor: "white",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
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
        {user && user.email == product.userEmail && (
          <TouchableOpacity
            style={{
              paddingLeft: 30,
            }}
            onPress={onDeleteProduct}
          >
            <Ionicons name="trash" size={30} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default Intro;
