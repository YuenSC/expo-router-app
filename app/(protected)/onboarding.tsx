import { ThemedText } from "@/src/components/ThemedText";
import { Link } from "expo-router";
import { forwardRef } from "react";
import { Button, ButtonProps, Pressable } from "react-native";
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
        {/* TODO: The Button trigger Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?  */}
        <Button title="Go to Home" />
      </Link>
    </SafeAreaView>
  );
}
