import { Text, View } from "react-native";
import { Colors } from "../../../../constants/Colors";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import PopularProductCard from "../../../elements/Card/PopularProductCard";
import { getRecords } from "../../../../services";

const PopularProducts = ({}) => {
  const [productsList, setProductsList] = useState([]);

  const fetchProductsList = async () => {
    try {
      const data = await getRecords('product-list', 10);
      setProductsList(data);
    } catch (err) {
      console.error(err);
      ToastAndroid.show("Error while fetching list of popular products", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    fetchProductsList();
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

      {productsList.length > 0 ? (
        <FlatList showsHorizontalScrollIndicator={false} horizontal={true} data={productsList} renderItem={({ item, index }) => <PopularProductCard product={item} key={index} index={index} />} />
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
    </View>
  );
};
export default PopularProducts;
