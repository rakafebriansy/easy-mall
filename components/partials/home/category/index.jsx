import { Text, View } from "react-native";
import { Colors } from "../../../../constants/Colors";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../../config/FirebaseConfig";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import CategoryCard from "../../../elements/Cards/CategoryCard";

const Category = ({}) => {
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, "category"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setCategoryList((prev) => [...prev, doc.data()]);
    });
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  return (
    <View
      style={{
        paddingHorizontal: 20,
        marginTop: 10,
        gap: 10
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

      {categoryList.length > 0 ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={categoryList}
          renderItem={({ item, index }) => <CategoryCard key={index} index={index} category={item} onCategoryPress={(category) => console.log(category.name)} />}
        />
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
                padding: 10,
                backgroundColor: Colors.FETCHING,
                borderRadius: 99,
                gap: 5,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                }}
              ></View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
export default Category;
