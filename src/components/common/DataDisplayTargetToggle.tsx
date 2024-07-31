import { Text, makeStyles } from "@rneui/themed";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";

import { DataDisplayTarget } from "@/src/types/DataDisplayTarget";

type IDataDisplayTargetToggleProps = {
  target: DataDisplayTarget;
  setTarget: (target: DataDisplayTarget) => void;
};

const DataDisplayTargetToggle = memo<IDataDisplayTargetToggleProps>(
  ({ setTarget, target }) => {
    const styles = useStyles();
    const { t } = useTranslation();

    return (
      <TouchableOpacity
        style={styles.toggleTarget}
        onPress={() =>
          setTarget(
            target === DataDisplayTarget.Group
              ? DataDisplayTarget.You
              : DataDisplayTarget.Group,
          )
        }
      >
        <Text style={styles.toggleTargetText}>
          {target === DataDisplayTarget.Group
            ? t("Common:groupLabel")
            : t("Common:profileUserLabel")}
        </Text>
      </TouchableOpacity>
    );
  },
);

const useStyles = makeStyles((theme) => ({
  toggleTarget: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    marginLeft: 4,
    marginTop: 8,
  },
  toggleTargetText: {
    color: theme.colors.white,
  },
}));

DataDisplayTargetToggle.displayName = "DataDisplayTargetToggle";

export default DataDisplayTargetToggle;
