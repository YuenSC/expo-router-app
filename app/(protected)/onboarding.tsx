import { Link } from "expo-router";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
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
        <Button title="Go To Home" />
      </Link>
    </SafeAreaView>
  );
}
