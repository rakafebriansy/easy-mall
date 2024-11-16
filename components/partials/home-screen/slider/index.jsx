import { Image, Text, ToastAndroid, View } from "react-native";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Colors } from "../../../../constants/Colors";
import { getRecords } from "../../../../services";

const Slider = ({}) => {
  const [sliders, setSliders] = useState([]);

  const fetchSliders = async () => {
    try {
      const data = await getRecords('slider');
      setSliders(data);
    } catch (err) {
      console.err(err);
      ToastAndroid.show("Error while fetching banners!", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    fetchSliders();
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
      {sliders.length > 0 ? (
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={sliders}
          renderItem={({ item, index }) => (
            <Image
              source={{
                uri: item.imageUrl,
              }}
              resizeMode="stretch"
              style={{
                marginLeft: index === 0 ? 20 : 0,
                marginRight: 20,
                borderRadius: 15,
                width: 300,
                height: 150,
              }}
            />
          )}
        />
      ) : (
        <View
          style={{
            flexDirection: "row",
            overflow: "hidden",
            gap: 20,
            paddingLeft: 20,
          }}
        >
          {Array.from({ length: 2 }, (_, i) => i + 1).map((i) => (
            <View
              key={i}
              style={{
                borderRadius: 15,
                width: 300,
                height: 150,
                backgroundColor: Colors.FETCHING,
              }}
            ></View>
          ))}
        </View>
      )}
    </View>
  );
};
export default Slider;
