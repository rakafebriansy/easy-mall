import { Image, Text, ToastAndroid, View } from "react-native";
import { query, collection, getDocs } from "firebase/firestore";
import { db } from "../../../../config/FirebaseConfig";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";

const Slider = ({}) => {
  const [sliderList, setSliderList] = useState([]);

  const fetchSliderList = async () => {
    try {
      setSliderList([]);
      const q = query(collection(db, "slider"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setSliderList((prev) => [...prev, doc.data()]);
      });
    } catch (error) {
      console.error(error);
      ToastAndroid.show("Error while fetching data!", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    fetchSliderList();
  }, []);

  return (
    <View>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
          padding: 20,
        }}
      >
        #For you
      </Text>
      {sliderList.length > 0 ? (
        <FlatList
          horizontal={true}
          style={{
            paddingLeft: 20,
          }}
          showsHorizontalScrollIndicator={false}
          data={sliderList}
          renderItem={({ item, index }) => (
            <Image
              source={{
                uri: item.imageUrl,
              }}
              resizeMode="stretch"
              style={{
                borderRadius: 15,
                width: 300,
                height: 150,
                marginRight: 15,
              }}
            />
          )}
        />
      ) : (
        <View
          style={{
            flexDirection: "row",
            overflow: "hidden",
            gap: 15,
            paddingLeft: 20,
          }}
        >
          <View
            style={{
              borderRadius: 15,
              width: 300,
              height: 150,
              backgroundColor: "#E7E7E7",
            }}
          ></View>
          <View
            style={{
              borderRadius: 15,
              width: 300,
              height: 150,
              backgroundColor: "#E7E7E7",
            }}
          ></View>
        </View>
      )}
    </View>
  );
};
export default Slider;
