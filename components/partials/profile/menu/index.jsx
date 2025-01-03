import { useRouter } from "expo-router";
import { Alert, Share, TouchableOpacity } from "react-native";
import { FlatList, Image, Text, View } from "react-native";

const Menu = ({}) => {

  const router = useRouter();

  const onMenuClick = (item) => {
    if(item.path == 'logout') {
      Alert.alert('Logout','Are you sure want to Logout?', [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: signOut
        }
      ]);
      return;
    }
    if(item.path == 'share') {
      Share.share({
        message: 'Download Easy Mall on Play Store'
      });
      return;
    }
    router.push(item.path);
  }

  const menus = [
    {
      id: 1,
      name: "Add Product",
      icon: require("../../../../assets/images/add-button.png"),
      path: "/product/add-product"
    },
    {
      id: 2,
      name: "My Products",
      icon: require("../../../../assets/images/bag.png"),
      path: "/product/my-products"
    },
    {
      id: 3,
      name: "Share App",
      icon: require("../../../../assets/images/share-app.png"),
      path: 'share'
    },
    {
      id: 4,
      name: "Logout",
      icon: require("../../../../assets/images/logout.png"),
      path: 'logout'
    },
  ];

  return (
    <View>
      <FlatList
        data={menus}
        numColumns={2}
        columnWrapperStyle= {{ gap: 20 }}
        contentContainerStyle= {{ gap: 20 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onMenuClick(item)}
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
