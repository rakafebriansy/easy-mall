import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const TopBar = ({}) => {
  const router = useRouter();
  return (
    <View
      style={{
        position: "absolute",
        zIndex: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        padding: 20,
        paddingTop: 40,
        backgroundColor: "rgba(0,0,0,0.25)",
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons size={40} name="arrow-back-circle" color={"white"} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons size={40} name="heart-outline" color={"white"} />
      </TouchableOpacity>
    </View>
  );
};
export default TopBar;
