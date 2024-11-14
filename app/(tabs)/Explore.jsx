import { FlatList, Text, TextInput, View } from "react-native";
import CategoryList from "../../components/elements/List/CategoryList";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { getRecordsByField } from "../../services";
import { useEffect, useState } from "react";
import ProductCard from "../../components/elements/Card/ProductCard";
import { ScrollView } from "react-native";

const Explore = ({}) => {
  const [productsList, setProductsList] = useState([]);
  const [isFetching, setIsFecthing] = useState(true);

  const fetchProductsByCategory = async (categoryName) => {
    try {
      const data = await getRecordsByField("product-list", "category", "==", categoryName);
      setProductsList(data);
      setIsFecthing(false);
    } catch (err) {
      console.log(err);
      ToastAndroid.show("Error while fetching list of products", ToastAndroid.SHORT);
    }
  };

  const refresh = (category) => {
    setIsFecthing(true);
    fetchProductsByCategory(category.name);
  };

  return (
    <View
      style={{
        paddingTop: 40,
      }}
    >
      <FlatList
        contentContainerStyle={{
          gap: 15,
          padding: 20,
        }}
        showsVerticalScrollIndicator={false}
        // onRefresh={refresh}
        // refreshing={isFetching}
        data={productsList}
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
            <CategoryList screen="explore" callback={refresh} />
          </>
        }
        renderItem={({ item, index }) => (
          <View>
            <ProductCard product={item} key={index} />
          </View>
        )}
      />
    </View>
  );
};
export default Explore;
