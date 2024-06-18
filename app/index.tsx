import { useAuth } from "@/components/AuthContext";
import { HStack, VStack } from "@/components/Stack";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { useState } from "react";
import { ActivityIndicator, Button, StyleSheet, View } from "react-native";

const LoginPage = () => {
  const [email, setEmail] = useState("calvin_yuen_1@gmail.com");
  const [password, setPassword] = useState("Example@001");
  const { onLogin, authState } = useAuth();

  return (
    <VStack style={styles.container} justifyContent="center" gap={8}>
      <ThemedTextInput
        placeholder="xxx@gmail.com"
        label="Email"
        value={email}
        onChangeText={setEmail}
      />
      <ThemedTextInput
        placeholder="XXXXXX"
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <HStack style={{ minHeight: 40 }} justifyContent="center">
        {authState.isPending ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Button title="Login" onPress={() => onLogin({ email, password })} />
        )}
      </HStack>
      <Button
        title="Login as Admin"
        onPress={() =>
          onLogin({ email: "calvin_yuen_1_admin@gmail.com", password })
        }
      />
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
});

export default LoginPage;
