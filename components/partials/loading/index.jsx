import { ActivityIndicator, Text, View } from "react-native";
import { Colors } from "../../../constants/Colors";
const Loading = ({}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
    </View>
  );
};
export default Loading;
