import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { useState } from "react";
import { Stack } from "expo-router";
import { HStack } from "@/components/ui/hstack";
import { useMutation } from "@tanstack/react-query";
import { login, signup } from "@/api/auth";
import { useAuth } from "@/store/authStore";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setUser = useAuth((s) => s.setUser);
  const setToken = useAuth((s) => s.setToken);

  const loginMutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      console.log("success login✅", data);
    },
    onError: () => {
      console.log("error");
    },
  });

  const signupMutation = useMutation({
    mutationFn: () => signup(email, password),
    onSuccess: (data) => {
      console.log("successfully signup✅", data);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    <FormControl
      isInvalid={loginMutation.error || signupMutation.error}
      className="p-4 border rounded-lg border-outline-300 bg-white m-2">
      <Stack.Screen options={{ title: "Login" }} />
      <VStack space="xl">
        <Heading className="text-typography-900 leading-3 pt-3">Login</Heading>
        <VStack space="xs">
          <Text className="text-typography-500 leading-1">Email</Text>
          <Input>
            <InputField type="text" value={email} onChangeText={setEmail} />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text className="text-typography-500 leading-1">Password</Text>
          <Input className="text-center">
            <InputField
              type={showPassword ? "text" : "password"}
              value={password}
              onChangeText={setPassword}
            />
            <InputSlot className="pr-3" onPress={handleState}>
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} className="text-darkBlue-500" />
            </InputSlot>
          </Input>
        </VStack>
        <HStack space="sm">
          <Button
            className="flex-1"
            variant="outline"
            onPress={() => {
              signupMutation.mutate();
            }}>
            <ButtonText>Sign up</ButtonText>
          </Button>
          <Button
            className="flex-1"
            onPress={() => {
              loginMutation.mutate();
            }}>
            <ButtonText>Sign in</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </FormControl>
  );
}
