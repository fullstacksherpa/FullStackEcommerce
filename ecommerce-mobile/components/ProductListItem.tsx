import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Link } from "expo-router";
import { Pressable } from "react-native";

export interface Product {
  product: {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
  };
}

export default function ProductListItem({ product }: Product) {
  return (
    <Link href={`/product/${product.id}`} asChild>
      <Pressable className="flex-1">
        <Card className="p-5 rounded-lg max-w-[360px] m-3 flex-1">
          <Image
            source={{
              uri: product.image,
            }}
            className="mb-6 h-[240px] w-full rounded-md"
            alt={product.name}
            resizeMode="contain"
          />
          <Text className="text-sm font-normal mb-2 text-typography-700">{product.name}</Text>

          <Heading size="md" className="mb-4">
            $ {product.price}
          </Heading>
        </Card>
      </Pressable>
    </Link>
  );
}
