import { Image, ImageProps } from "expo-image";
import { memo } from "react";

type IStyledImageProps = ImageProps;

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const StyledImage = memo<IStyledImageProps>((props) => {
  return (
    <Image
      {...props}
      placeholder={{ blurhash }}
      contentFit="cover"
      transition={1000}
    />
  );
});

StyledImage.displayName = "StyledImage";

export default StyledImage;
