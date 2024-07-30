import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { useTheme } from "@rneui/themed";
import { memo } from "react";
import { StyleProp, ViewStyle } from "react-native";

import { BillCategoryEnum } from "@/src/api/types/BillCategories";

type IBillCategoryIconProps = {
  category: BillCategoryEnum;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

const BillCategoryIcon = memo<IBillCategoryIconProps>(
  ({ category, color, size, ...rest }) => {
    // const styles = useStyles();
    const { theme } = useTheme();
    const props = {
      color: color || theme.colors.black,
      size: size || 20,
      ...rest,
    };

    switch (category) {
      case BillCategoryEnum.Accommodation:
        return <Ionicons name="bed" {...props} />;
      case BillCategoryEnum.Entertainment:
        return <FontAwesome name="money" {...props} />;
      case BillCategoryEnum.FoodAndDining:
        return <FontAwesome5 name="coffee" {...props} />;
      case BillCategoryEnum.Insurance:
        return <Entypo name="text-document" {...props} />;
      case BillCategoryEnum.Miscellaneous:
        return <FontAwesome5 name="comment-alt" {...props} />;
      case BillCategoryEnum.Shopping:
        return <Entypo name="shopping-cart" {...props} />;
      case BillCategoryEnum.SightseeingAndActivities:
        return <Entypo name="flower" {...props} />;
      case BillCategoryEnum.Transportation:
        return <FontAwesome name="car" {...props} />;
    }
  },
);

// const useStyles = makeStyles((theme) => ({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.background,
//   },
// }));

BillCategoryIcon.displayName = "BillCategoryIcon";

export default BillCategoryIcon;
