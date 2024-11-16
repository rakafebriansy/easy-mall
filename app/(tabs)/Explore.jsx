import { Dimensions, FlatList, Text, TextInput, View } from "react-native";
import CategoryList from "../../components/elements/List/CategoryList";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { getRecords, getRecordsByField } from "../../services";
import { useEffect, useState } from "react";
import ProductCard from "../../components/elements/Card/ProductCard";
import NotFound from "../../components/elements/Utils/NotFound";
import Loading from "../../components/elements/Utils/Loading";

const Explore = ({}) => {
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFecthing] = useState(false);
  const height = Dimensions.get("window").height;

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

  const fetchProducts = async () => {
    try {
      const data = await getRecords("product-list", 10);
      setProducts(data);
      setIsFecthing(false);
    } catch (err) {
      console.log(err);
      ToastAndroid.show("Error while fetching list of products", ToastAndroid.SHORT);
    }
  };

  const refreshByCategory = (category) => {
    setIsFecthing(true);
    fetchProductsByCategory(category.name);
  };
  const refresh = () => {
    setIsFecthing(true);
    fetchProducts();
  };

  useEffect(() => {
    setIsFecthing(true);
    fetchProducts();
  }, []);

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
        <View
          style={{
            paddingTop: 20,
          }}
        >
          <FlatList
            contentContainerStyle={{
              gap: 15,
              padding: 20,
            }}
            showsVerticalScrollIndicator={false}
            onRefresh={refresh}
            refreshing={isFetching}
            data={products}
            ListHeaderComponent={
              <>
                <View>
                  <Text
                    style={{
                      fontFamily: "outfit-bold",
                      fontSize: 25,
                    }}
                  >
                    Explore More
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                      marginTop: 15,
                      marginBottom: 5,
                      borderRadius: 10,
                      backgroundColor: "white",
                      borderColor: Colors.PRIMARY,
                      borderWidth: 1,
                      padding: 10,
                    }}
                  >
                    <Ionicons name="search" size={24} color={Colors.PRIMARY} />
                    <TextInput
                      placeholder="Search ..."
                      style={{
                        fontFamily: "outfit",
                        fontSize: 16,
                        flex: 1,
                      }}
                    />
                  </View>
                </View>
                <CategoryList screen="explore" callback={refreshByCategory} />
              </>
            }
            ListEmptyComponent={
              <View
                style={{
                  height: (height * 3) / 5,
                }}
              >
                <NotFound>No Product Found</NotFound>
              </View>
            }
            renderItem={({ item, index }) => (
              <View>
                <ProductCard product={item} key={index} />
              </View>
            )}
          />
        </View>
      )}
    </>
  );
};
export default Explore;
