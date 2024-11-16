import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import ProductListItem from "../../components/elements/ListItem/ProductListItem";
import { ToastAndroid } from "react-native";
import Loading from "../../components/elements/Utils/Loading";
import { getRecordsByField } from "../../services";
import NotFound from "../../components/elements/Utils/NotFound";

const ProductListByCategory = ({}) => {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFecthing] = useState(true);

  const fetchProductsByCategory = async (categoryName) => {
    try {
      setIsFecthing(true);
      const data = await getRecordsByField("product-list", "category", "==", categoryName);
      setProducts(data);
    } catch (err) {
      console.log(err);
      ToastAndroid.show("Error while fetching list of products", ToastAndroid.SHORT);
    } finally {
      setIsFecthing(false);
    }
  };

  const refresh = () => {
    fetchProductsByCategory(category);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
      headerTitleStyle: {
        fontFamily: "outfit-bold",
      },
    });
    fetchProductsByCategory(category);
  }, []);

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : products.length > 0 ? (
        <View>
          <FlatList onRefresh={refresh} refreshing={isFetching} data={products} renderItem={({ item, index }) => <ProductListItem product={item} key={index} />} />
        </View>
      ) : (
        <NotFound>No Product Found</NotFound>
      )}
    </>
  );
};
export default ProductListByCategory;
