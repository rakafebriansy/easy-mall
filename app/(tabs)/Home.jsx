import { Text, View } from "react-native";
import Header from "../../components/partials/home/header";
import Slider from "../../components/partials/home/slider";
import Category from "../../components/partials/home/category";


const Home = ({  }) => {
    return (
        <View style={{
            paddingTop: 10
        }}>
            <Header />
            <Slider />
            <Category />
        </View>
    );
};
export default Home;