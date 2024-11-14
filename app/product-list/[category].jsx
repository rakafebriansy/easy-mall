import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import ProductListCard from "../../components/elements/Cards/ProductListCard";
import { Colors } from "../../constants/Colors";
import { ToastAndroid } from "react-native";
import { db } from "../../config/FirebaseConfig";
import Loading from "../../components/partials/loading";
const ProductListByCategory = ({}) => {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();
  const [productsList, setProductsList] = useState([]);
  const [isFetching, setIsFecthing] = useState(true);

  const fetchProductListByCategory = async (categoryName) => {
    try {
      setProductsList([]);
      const q = query(collection(db, "product-list"), where("category", "==", categoryName));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setProductsList((prev) => [
          ...prev,
          {
            id: doc.id,
            ...doc.data(),
          },
        ]);
      });
      setIsFecthing(false);
    } catch (err) {
      console.log(err);
      ToastAndroid.show("Error while fetching list of products", ToastAndroid.SHORT);
    }
  };

  const refreshProduct = () => {
    setIsFecthing(true);
    fetchProductListByCategory(category);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
    });
    fetchProductListByCategory(category);
  }, []);

  return (
    <>
      {isFetching ? (
        <Loading />
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
