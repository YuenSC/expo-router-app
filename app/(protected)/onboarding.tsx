import { useAuth } from "@/src/components/AuthContext";
import { ThemedText } from "@/src/components/ThemedText";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { onLogout } = useAuth();
  return (
    <SafeAreaView style={{ flex: 1, marginTop: 16 }}>
      <Link
        asChild
        href={{
          pathname: "/home",
          params: {
            user: "Calvin",
          },
        }}
      >
        <ThemedText>Go to Home</ThemedText>
      </Link>
    </SafeAreaView>
  );
}
