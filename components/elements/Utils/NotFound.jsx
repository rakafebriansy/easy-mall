import { Text, View } from "react-native";
import { Colors } from "../../../constants/Colors";
const NotFound = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontFamily: "outfit-bold",
          color: Colors.GRAY,
          textAlign: "center",
        }}
      >
        {children}
      </Text>
    </View>
  );
};
export default NotFound;
