import { useState } from "react";
import { Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import { Rating } from "react-native-ratings";
import { Colors } from "../../../../constants/Colors";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

const Review = ({ product, refreshProduct }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { user } = useUser();

  const onSubmitComment = async () => {
    try {
      const docRef = doc(db, "product-list", product.id);
      await updateDoc(docRef, {
        reviews: arrayUnion({
          rating: rating,
          comment: comment,
          userName: user.fullName,
          userImage: user.imageUrl,
          userEmail: user.primaryEmailAddress.emailAddress,
        }),
      });
      ToastAndroid.show("Comment Added Successfully", ToastAndroid.LONG);
      refreshProduct();
    } catch (err) {
      console.error();
      ToastAndroid.show("Error while updating product", ToastAndroid.SHORT);
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "white",
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 18,
        }}
      >
        Give Your Review!
      </Text>
      <View>
        <Rating
          startingValue={rating}
          showRating={false}
          imageSize={30}
          onFinishRating={(rating) => setRating(rating)}
          style={{
            paddingVertical: 10,
            alignItems: "flex-start",
          }}
        />
        <TextInput
          numberOfLines={4}
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: Colors.GRAY,
            textAlignVertical: "top",
          }}
          onChangeText={(value) => setComment(value)}
          placeholder="Write your comment"
        />
        <TouchableOpacity
          disabled={!comment}
          onPress={onSubmitComment}
          style={{
            padding: 10,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit",
              color: "white",
              textAlign: "center",
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Review;