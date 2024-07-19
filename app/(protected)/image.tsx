import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import ImageView from "react-native-image-viewing";

const Page = () => {
  const router = useRouter();
  const { encodedImageUrl = "" } = useLocalSearchParams<{
    encodedImageUrl?: string;
  }>();

  const [visible, setIsVisible] = useState(true);

  return (
    <ImageView
      images={[
        {
          uri: decodeURIComponent(encodedImageUrl),
        },
      ]}
      imageIndex={0}
      visible={visible}
      onRequestClose={() => {
        setIsVisible(false);
        router.back();
      }}
    />
  );
};

export default Page;
