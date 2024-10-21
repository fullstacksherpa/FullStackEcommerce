import products from "../assets/products.json";
import { FlatList } from "react-native";
import ProductListItem from "@/components/ProductListItem";

export default function HomeScreen() {
  return (
    <FlatList
      numColumns={2}
      data={products}
      contentContainerClassName="gap-2"
      columnWrapperClassName="gap-2"
      renderItem={({ item }) => <ProductListItem product={item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
