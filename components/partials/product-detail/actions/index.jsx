import { Linking, Share, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { FlatList, Text, View } from "react-native";
const Actions = ({ product }) => {
  const actionMenus = [
    {
      id: 1,
      name: "Call",
      icon: require("../../../../assets/images/phone-call.png"),
      url: `tel:${product.contact}`,
    },
    {
      id: 2,
      name: "Location",
      icon: require("../../../../assets/images/location.png"),
      url: `https://www.google.com/maps/search/?api=1&query=${product.address}`,
    },
    {
      id: 3,
      name: "Web",
      icon: require("../../../../assets/images/internet.png"),
      url: product.website,
    },
    {
      id: 4,
      name: "Share",
      icon: require("../../../../assets/images/share.png"),
      url: null,
    },
  ];

  const onPressHandler = (item) => {
    if (item.name == "Share") {
      Share.share({
        message: product.name + "\n Address: " + product.address + "\n Find more details on Easy Mall!",
      });
      return;
    }
    Linking.openURL(item.url);
  };

  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "white",
      }}
    >
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ justifyContent: "space-between", flex: 1 }}
        data={actionMenus}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            style={{
              alignItems: "center",
              gap: 4,
            }}
            onPress={() => onPressHandler(item)}
          >
            <Image
              source={item.icon}
              style={{
                width: 45,
                height: 45,
              }}
            />
            <Text
              style={{
                fontFamily: "outfit-medium",
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
export default Actions;
