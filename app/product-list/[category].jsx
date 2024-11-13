import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import ProductListCard from "../../components/elements/Cards/ProductListCard";
import { Colors } from "../../constants/Colors";
import { ToastAndroid } from "react-native";
import { db } from "../../config/FirebaseConfig";
import LoadingScreen from "../../components/partials/loading-screen";
const ProductListByCategory = ({}) => {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();
  const [productsList, setProductsList] = useState([]);
  const [isFetching, setIsFecthing] = useState(true);

  const fetchProductList = async () => {
    try {
      setProductsList([]);
      const q = query(collection(db, "product-list"), where("category", "==", category));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setProductsList((prev) => [...prev, doc.data()]);
      });
      setIsFecthing(false);
    } catch (err) {
      console.log(err);
      ToastAndroid.show("Error while fetching list of products", ToastAndroid.SHORT);
    }
  };

  const refreshProduct = () => {
    setIsFecthing(true);
    fetchProductList();
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
    });
    fetchProductList();
  }, []);

  return (
    <>
      {isFetching ? (
        <LoadingScreen />
      ) : productsList.length > 0 ? (
        <View>
          <FlatList onRefresh={refreshProduct} refreshing={isFetching} data={productsList} renderItem={({ item, index }) => <ProductListCard product={item} key={index} />} />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: "outfit-bold",
              color: Colors.GRAY,
              textAlign: "center",
            }}
          >
            No Product Found
          </Text>
        </View>
      )}
    </>
  );
};
export default ProductListByCategory;
