import { Image, Text, View } from "react-native";
import { Colors } from "../../../constants/Colors";
import { TouchableOpacity } from "react-native";

const CategoryCard = ({ category, onCategoryPress, index }) => {
  return (
    <TouchableOpacity
      onPress={() => onCategoryPress(category)}
      style={{
        alignItems: "center",
        marginLeft: index === 0 ? 0 : 20,
      }}
    >
      <View
        style={{
          padding: 10,
          backgroundColor: Colors.SECONDARY,
          borderRadius: 99,
          gap: 5,
        }}
      >
        <Image
          source={{
            uri: category.icon,
          }}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 12,
          fontFamily: "outfit-medium",
          textAlign: "center",
        }}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};
export default CategoryCard;
