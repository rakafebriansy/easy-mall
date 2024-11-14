import { Text, ToastAndroid, View } from "react-native";
import { Colors } from "../../../constants/Colors";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import CategoryCard from "../Card/CategoryCard";
import { getRecords } from "../../../services";

const Category = ({ screen, callback = () => {} }) => {
  const [categoriesList, setCategoriesList] = useState([]);

  const fetchCategoriesList = async () => {
    try {
      const data = await getRecords('category');
      setCategoriesList(data);
    } catch (err) {
      console.error(err);
      ToastAndroid.show("Error while fetching list of categories", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    fetchCategoriesList();
  }, []);

  return (
    <View
      style={{
        marginTop: 20,
        gap: 10,
      }}
    >
      {screen == "home" && (
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
            Category
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
      )}

      {categoriesList.length > 0 ? (
        <FlatList showsHorizontalScrollIndicator={false} horizontal={true} data={categoriesList} renderItem={({ item, index }) => <CategoryCard key={index} index={index} category={item} onCategoryPress={() => callback(item)} />} />
      ) : (
        <View
          style={{
            flexDirection: "row",
            gap: 20,
          }}
        >
          {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (
            <View
              key={i}
              style={{
                width: 70,
                height: 70,
                backgroundColor: Colors.FETCHING,
                borderRadius: 99,
                gap: 5,
              }}
            />
          ))}
        </View>
      )}
    </View>
  );
};
export default Category;
