import { Text, View, Image } from "react-native";
import { Rating } from "react-native-ratings";
import { Colors } from "../../../../constants/Colors";

const ProductReviews = ({ product }) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 18,
        }}
      >
        Product Reviews
      </Text>
      <View
        style={{
          gap: 10,
        }}
      >
        {product.reviews && product.reviews.length > 0 ? (
          <>
            {product.reviews.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  gap: 20,
                  alignItems: "center",
                  padding: 10,
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: Colors.GRAY,
                }}
              >
                <Image
                  source={{ uri: item.userImage }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 99,
                  }}
                />
                <View
                  style={{
                    alignItems: "flex-start",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "outfit-medium",
                    }}
                  >
                    {item.userName}
                  </Text>
                  <Rating
                    imageSize={14}
                    startingValue={item.rating}
                    readonly={true}
                    style={{
                      alignItems: "flex-start",
                    }}
                  />
                  <Text>{item.comment}</Text>
                </View>
              </View>
            ))}
          </>
        ) : (
          <View
            style={{
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "outfit",
                color: Colors.GRAY
              }}
            >
              There's no review.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
export default ProductReviews;
