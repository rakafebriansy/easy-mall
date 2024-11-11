import { Text, View } from "react-native";
import { Colors } from "../../../../constants/Colors";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../../../../config/FirebaseConfig";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import PopularProductCard from "../../../elements/Cards/PopularProductCard";

const PopularProducts = ({}) => {
  const [productsList, setProductsList] = useState([]);

  const fetchProductsList = async () => {
    setProductsList([]);
    const q = query(collection(db, "product-list"), limit(10));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setProductsList((prev) => [...prev, doc.data()]);
    });
  };

  useEffect(() => {
    fetchProductsList();
  }, []);

  return (
    <View
      style={{
        paddingHorizontal: 20,
        marginTop: 20,
        gap: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
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
