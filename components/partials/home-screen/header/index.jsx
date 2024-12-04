import { Image, Text, TextInput, View } from "react-native";
import { Colors } from "../../../../constants/Colors"
import { Ionicons } from "@expo/vector-icons";

const Header = ({ user }) => {

  return (
    <View style={{
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.PRIMARY,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap:10
      }}>
        <Image
          source={{
            uri: user.photo,
          }}
          style={{
            width: 45,
            height: 45,
            borderRadius: 99,
          }}
        />
        <View>
            <Text style={{
                color: 'white'
            }}>Welcome,</Text>
            <Text style={{
                fontSize: 19,
                color: 'white',
                fontFamily: 'outfit-medium'
            }}>{user.name}</Text>
        </View>
      </View>
      <View style={{
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        gap: 10,
        padding: 10,
        marginTop: 15,
        marginBottom: 5,
        borderRadius: 10,
        backgroundColor: 'white'
      }}>
        <Ionicons name="search" size={24} color={ Colors.PRIMARY } />
        <TextInput placeholder="Search ..." style={{
            fontFamily: 'outfit',
            fontSize: 16,
            flex: 1,
        }} />
      </View>
    </View>
  );
};
export default Header;
