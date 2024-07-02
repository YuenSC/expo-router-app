import { Text } from "@rneui/themed";
import { useQueryClient } from "@tanstack/react-query";
import { Button, StyleSheet, View } from "react-native";

import { useGetMe } from "@/src/api/hooks/useGetMe";
import { usePatchUserUpdate } from "@/src/api/hooks/user/usePatchUserUpdate";
import { HelloWave } from "@/src/components/HelloWave";
import ParallaxScrollView from "@/src/components/ParallaxScrollView";
import StyledImage from "@/src/components/common/StyledImage";
import { useAuth } from "@/src/context/AuthContext";

export default function HomeScreen() {
  const queryClient = useQueryClient();
  const { onLogout } = useAuth();
  const { data } = useGetMe();
  const userId = data?.id || "";
  const { mutate } = usePatchUserUpdate({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <StyledImage
          source={require("@/src/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <View style={styles.titleContainer}>
        <Text>Welcome!</Text>
        <HelloWave />
      </View>
      <Button title="Logout" onPress={onLogout} />
      <Button
        title="Reset Onboarding"
        onPress={() => mutate({ id: userId, isOnboardingCompleted: false })}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
