import { TouchableOpacity } from "react-native";
import { FlatList, Image, Text, View } from "react-native";
const Menu = ({}) => {
  const menuList = [
    {
      id: 1,
      name: "Add Product",
      icon: require("../../../../assets/images/add-button.png"),
    },
    {
      id: 2,
      name: "My Products",
      icon: require("../../../../assets/images/bag.png"),
    },
    {
      id: 3,
      name: "Share App",
      icon: require("../../../../assets/images/share-app.png"),
    },
    {
      id: 4,
      name: "Logout",
      icon: require("../../../../assets/images/logout.png"),
    },
  ];

  return (
    <View>
      <FlatList
        data={menuList}
        numColumns={2}
        columnWrapperStyle= {{ gap: 20 }}
        contentContainerStyle= {{ gap: 20 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              padding: 10,
              borderRadius: 15,
              borderWidth: 1,
              backgroundColor :'white'
            }}
          >
            <Image
              source={item.icon}
              style={{
                width: 40,
                height: 40,
              }}
            />
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 14,
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
export default Menu;
