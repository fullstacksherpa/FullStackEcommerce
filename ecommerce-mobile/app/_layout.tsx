import "@/global.css";
import { Link, Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Icon } from "@/components/ui/icon";
import { ShoppingCart } from "lucide-react-native";
import { Pressable } from "react-native";
import { useCart } from "@/store/cartStore";
import { Text } from "@/components/ui/text";

const queryClient = new QueryClient();

export default function RootLayout() {
  const cartItemsNum = useCart((state) => state.items.length);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider>
          <Stack
            screenOptions={{
              headerRight: () => (
                <Link href={"/cart"} asChild>
                  <Pressable className="flex-row gap-2">
                    <Icon as={ShoppingCart} />
                    <Text>{cartItemsNum}</Text>
                  </Pressable>
                </Link>
              ),
            }}>
            <Stack.Screen name="index" options={{ title: "shop" }} />
            <Stack.Screen name="product/[id]" options={{ title: "Product" }} />
            <Stack.Screen name="cart" options={{ title: "Cart" }} />
          </Stack>
        </GluestackUIProvider>
      </QueryClientProvider>
    </>
  );
}
