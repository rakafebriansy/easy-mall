import { Text, View } from "react-native";
import Loading from "../../elements/Utilities/Loading";
const LoadingScreen = ({  }) => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Loading />
          </View>
    );
};
export default LoadingScreen;