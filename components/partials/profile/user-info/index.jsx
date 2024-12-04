import { Dimensions, Image, Text, View } from "react-native";
const UserInfo = ({ user }) => {
  const height = Dimensions.get("window").height;

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: height / 3,
        gap: 2
      }}
    >
      <Image
        source={{
          uri: user.photo,
        }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 99,
        }}
      />
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
        }}
      >
        {user.name}
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 16,
        }}
      >
        {user.email}
      </Text>
    </View>
  );
};
export default UserInfo;
