import { ScrollView, View } from "react-native";
import CategoryList from "../../components/elements/List/CategoryList";
import Header from "../../components/partials/home-screen/header";
import Slider from "../../components/partials/home-screen/slider";
import PopularProducts from "../../components/partials/home-screen/popular-products";
import { useRouter } from "expo-router";

const Home = ({}) => {
  const router = useRouter();
  const toProductDetail = (product) => router.push(`/product-list/${product.name}`);

  return (
    <ScrollView
      style={{
        paddingTop: 10,
      }}
    >
      <Header />
      <Slider />
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <CategoryList screen="home" callback={toProductDetail} />
      </View>
      <PopularProducts />
      <View
        style={{
          height: 40,
        }}
      />
    </ScrollView>
  );
};
export default Home;
