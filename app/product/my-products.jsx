import { useEffect, useState } from "react";
import { Dimensions, FlatList, Text, ToastAndroid, View } from "react-native";
import Loading from "../../components/elements/Utils/Loading";
import { useUser } from "@clerk/clerk-expo";
import { getRecordsByField } from "../../services";
import { useNavigation } from "expo-router";
import NotFound from "../../components/elements/Utils/NotFound";
import ProductListItem from "../../components/elements/ListItem/ProductListItem";

const MyProducts = ({}) => {
  const navigation = useNavigation();
  const { isLoaded, user } = useUser();
  const height = Dimensions.get('window').height;
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsFetching(true);
      const data = await getRecordsByField("product-list", "userEmail", "==", user.primaryEmailAddress.emailAddress);
      setProducts(data);
    } catch (err) {
      console.error(err);
      ToastAndroid.show("Error while fetching products", ToastAndroid.SHORT);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "My Products",
      headerShown: true,
      headerTitleStyle: {
        fontFamily: "outfit-bold",
      },
    });
    fetchProducts();
  }, []);

  return (
    <>
      {isFetching && isLoaded ? (
        <Loading />
      ) : (
        <>
          {products.length > 0 ? (
            <View
              style={{
                padding: 20,
              }}
            >
              <FlatList contentContainerStyle={{ 
                height: height
               }} onRefresh={fetchProducts} refreshing={isFetching} data={products} renderItem={({ item, index }) => <ProductListItem product={item} key={index} />} />
            </View>
          ) : (
            <NotFound />
          )}
        </>
      )}
    </>
  );
};
export default MyProducts;
