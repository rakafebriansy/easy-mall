import { Text, View } from "react-native";
import UserInfo from "../../components/partials/profile/user-info";
import Menu from "../../components/partials/profile/menu";
import { Colors } from "../../constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import Loading from "../../components/elements/Utils/Loading";

const Profile = ({}) => {
  const { user } = useUser();
  return (
    <>
      {user ? (
        <View
          style={{
            padding: 20,
            paddingTop: 40,
            flex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 25,
            }}
          >
            Profile
          </Text>
          <UserInfo user={user} />
          <Menu />
          <Text
            style={{
              textAlign: "center",
              fontFamily: "outfit",
              color: Colors.GRAY,
              fontSize: 12,
              position: "absolute",
              bottom: 10,
              left: 10,
            }}
          >
            © 2024 rakafebriansy. Licensed under the MIT License.
          </Text>
        </View>
      ) : (
        <Loading />
      )}
    </>
  );
};
export default Profile;
