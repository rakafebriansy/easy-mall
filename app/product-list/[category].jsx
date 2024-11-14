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
  const [productsList, setProductsList] = useState([]);
  const [isFetching, setIsFecthing] = useState(true);

  const fetchProductsByCategory = async (categoryName) => {
    try {
      const data = await getRecordsByField('product-list','category','==',categoryName);
      setProductsList(data);
      setIsFecthing(false);
    } catch (err) {
      console.log(err);
      ToastAndroid.show("Error while fetching list of products", ToastAndroid.SHORT);
    }
  };

  const refresh = () => {
    setIsFecthing(true);
    fetchProductsByCategory(category);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
    });
    fetchProductsByCategory(category);
  }, []);

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : productsList.length > 0 ? (
        <View>
          <FlatList onRefresh={refresh} refreshing={isFetching} data={productsList} renderItem={({ item, index }) => <ProductListItem product={item} key={index} />} />
        </View>
      ) : (
        <NotFound>No Product Found</NotFound>
      )}
    </>
  );
};
export default ProductListByCategory;
