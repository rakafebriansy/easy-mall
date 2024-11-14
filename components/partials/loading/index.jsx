import { ActivityIndicator, Text, View } from "react-native";
import { Colors } from "../../../constants/Colors";
const Loading = ({ transparent = false }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: transparent ? 'rgba(0,0,0,0.25)' : '',
      }}
    >
      <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
    </View>
  );
};
export default Loading;
