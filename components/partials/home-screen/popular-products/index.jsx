import { Text, View } from "react-native";
import { Colors } from "../../../../constants/Colors";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import PopularProductCard from "../../../elements/Card/PopularProductCard";
import { getRecords } from "../../../../services";
import NotFound from "../../../elements/Utils/NotFound";

const PopularProducts = ({}) => {
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchProducts = async () => {
    try {
      const data = await getRecords("product-list", 10);
      setProducts(data);
    } catch (err) {
      console.error(err);
      ToastAndroid.show("Error while fetching list of popular products", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View
      style={{
        marginTop: 20,
        gap: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-bold",
          }}
        >
          Popular Products
        </Text>
        <Text
          style={{
            color: Colors.PRIMARY,
            fontFamily: "outfit-medium",
          }}
        >
          View All
        </Text>
      </View>

      {!isFetching ? (
        <>
          {products.length > 0 ? (
            <FlatList
              onRefresh={fetchProducts}
              refreshing={isFetching}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={products}
              renderItem={({ item, index }) => <PopularProductCard product={item} key={index} index={index} />}
            />
          ) : (
            <View
              style={{
                flexDirection: "row",
                gap: 20,
                paddingHorizontal: 20,
              }}
            >
              {Array.from({ length: 2 }, (_, i) => i + 1).map((i) => (
                <View
                  key={i}
                  style={{
                    alignItems: "center",
                    width: 220,
                    height: 195,
                    backgroundColor: Colors.FETCHING,
                    borderRadius: 15,
                  }}
                />
              ))}
            </View>
          )}
        </>
      ) : (
        <NotFound />
      )}
    </View>
  );
};
export default PopularProducts;
