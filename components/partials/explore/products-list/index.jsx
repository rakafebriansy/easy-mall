import {  View } from "react-native";
import ProductCard from "../../../elements/Card/ProductCard";
const ProductsList = ({ productsList }) => {
  return (
    <View
      style={{
        gap: 15,
        padding: 20,
      }}
    >
      {productsList.map(({ item, index }) => (
        <View>
          <ProductCard product={item} key={index} />
        </View>
      ))}
    </View>
  );
};
export default ProductsList;
