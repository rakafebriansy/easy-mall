import { ScrollView, View } from "react-native";
import CategoryList from "../../components/elements/List/CategoryList";
import Header from "../../components/partials/home-screen/header";
import Slider from "../../components/partials/home-screen/slider";
import PopularProducts from "../../components/partials/home-screen/popular-products";
import { Redirect, useRouter } from "expo-router";
import Loading from "../../components/elements/Utils/Loading";
import { User } from "../../context/User";
import { useContext } from "react";

const Home = ({}) => {
  const router = useRouter();
  const toProductDetail = (product) => router.push(`/product-list/${product.name}`);
  const { user } = useContext(User);

  if(!user) {
    return <Redirect href="login"></Redirect> 
  }

  return (
    <>
      {user ? (
        <ScrollView>
          <Header user={user} />
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
      ) : (
        <Loading />
      )}
    </>
  );
};
export default Home;
