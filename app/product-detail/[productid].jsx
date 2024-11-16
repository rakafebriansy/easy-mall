import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import Loading from "../../components/elements/Utils/Loading";
import Intro from "../../components/partials/product-detail/intro";
import Actions from "../../components/partials/product-detail/actions";
import About from "../../components/partials/product-detail/about";
import { View } from "react-native";
import Review from "../../components/partials/product-detail/review";
import ProductReviews from "../../components/partials/product-detail/product-reviews";
import TopBar from "../../components/partials/product-detail/top-bar";
import { getRecordById } from "../../services";
import { useUser } from "@clerk/clerk-expo";

const ProductDetail = ({ }) => {
  const { productid } = useLocalSearchParams();
  const [product, setProduct] = useState({});
  const [isFetching, setIsFecthing] = useState(false);
  const { isLoaded, user } = useUser();

  const fetchProductDetailById = async (productId) => {
    try {
      setIsFecthing(false);
      const data = await getRecordById("product-list", productId);
      if (data) {
        setProduct(data);
      } else {
        console.info("No data");
      }
    } catch (err) {
      console.error(err);
      ToastAndroid.show("Error while fetching product", ToastAndroid.SHORT);
    } finally {
      setIsFecthing(false);
    }
  };

  useEffect(() => {
    fetchProductDetailById(productid);
  }, []);

  return (
    <>
      {!isFetching && isLoaded ? (
        <View>
          <TopBar />
          <ScrollView>
            <View>
              <Intro product={product} user={user} />
              <Actions product={product} />
              <About product={product} />
              <Review product={product} refresh={() => fetchProductDetailById(productid)} />
              <ProductReviews product={product} />
            </View>
          </ScrollView>
        </View>
      ) : (
        <Loading />
      )}
    </>
  );
};
export default ProductDetail;
