import { useAuth } from "@/components/AuthContext";
import { Link } from "expo-router";
import { Button, Text } from "react-native-paper";
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
        <Button mode="contained">
          <Text style={{ color: "black" }}>Go To Tabs</Text>
        </Button>
      </Link>
      <Button onPress={onLogout}>
        <Text>Logout</Text>
      </Button>
    </SafeAreaView>
  );
}
