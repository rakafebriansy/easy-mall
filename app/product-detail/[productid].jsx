import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { db } from "../../config/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Loading from "../../components/partials/loading";
import Intro from "../../components/partials/product-detail/intro";
import Actions from "../../components/partials/product-detail/actions";
import About from "../../components/partials/product-detail/about";
import { View } from "react-native";

const ProductDetail = ({}) => {
  const { productid } = useLocalSearchParams();
  const [productDetail, setProductDetail] = useState();
  const [isFetching, setIsFecthing] = useState(true);

  const fetchProductDetailById = async (productId) => {
    try {
      const docRef = doc(db, "product-list", productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProductDetail(docSnap.data());
      } else {
        console.log("No data");
      }
      setIsFecthing(false);
    } catch (err) {
      console.error(err);
      ToastAndroid.show("Error while fetching product", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    fetchProductDetailById(productid);
  }, []);

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
        <ScrollView>
          <View>
            <Intro product={productDetail} />
            <Actions product={productDetail} />
            <About product={productDetail} />
          </View>
        </ScrollView>
      )}
    </>
  );
};
export default ProductDetail;
