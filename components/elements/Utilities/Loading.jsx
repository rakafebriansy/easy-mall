import { Image } from "react-native";
const Loading = ({  }) => {
    return (
        <Image style={{
            width: 30,
            height: 30
        }} source={require('../../../assets/images/loading.gif')} />
    );
};
export default Loading;