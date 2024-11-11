import { ScrollView, View } from "react-native";
import Header from "../../components/partials/home/header";
import Slider from "../../components/partials/home/slider";
import Category from "../../components/partials/home/category";
import PopularProducts from "../../components/partials/home/popular-products";


const Home = ({  }) => {
    return (
        <ScrollView style={{
            paddingTop: 10
        }}>
            <Header />
            <Slider />
            <Category />
            <PopularProducts />
            <View style={{ 
                height: 40
             }} />
        </ScrollView>
    );
};
export default Home;