import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import ProductListItem from "../../components/elements/ListItem/ProductListItem";
import { Colors } from "../../constants/Colors";
import { ToastAndroid } from "react-native";
import Loading from "../../components/partials/loading";
import { getRecordsByField } from "../../services";

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
