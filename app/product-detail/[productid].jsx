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

const ProductDetail = ({}) => {
  const { productid } = useLocalSearchParams();
  const [productDetail, setProductDetail] = useState({});
  const [isFetching, setIsFecthing] = useState(true);

  const fetchProductDetailById = async (productId) => {
    try {
      const data = await getRecordById("product-list", productId);
      if (data) {
        setProductDetail(data);
      } else {
        console.info("No data");
      }
      setIsFecthing(false);
    } catch (err) {
      console.error(err);
      ToastAndroid.show("Error while fetching product", ToastAndroid.SHORT);
    }
  };

  const refresh = () => {
    fetchProductDetailById(productid);
  };

  useEffect(() => {
    fetchProductDetailById(productid);
  }, []);

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
        <View>
          <TopBar />
          <ScrollView>
            <View>
              <Intro product={productDetail} />
              <Actions product={productDetail} />
              <About product={productDetail} />
              <Review product={productDetail} refresh={refresh} />
              <ProductReviews product={productDetail} />
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};
export default ProductDetail;
