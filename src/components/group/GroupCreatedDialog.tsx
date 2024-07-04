import { Dialog, Text, makeStyles } from "@rneui/themed";
import { memo } from "react";
import { useTranslation } from "react-i18next";

type IGroupCreatedDialogProps = {
  onClose: () => void;
  onSubmit: () => void;
  isVisible: boolean;
};

const GroupCreatedDialog = memo<IGroupCreatedDialogProps>(
  ({ onClose, isVisible, onSubmit }) => {
    const styles = useStyles();
    const { t } = useTranslation();

    return (
      <Dialog
        isVisible={isVisible}
        onBackdropPress={onClose}
        overlayStyle={styles.overlay}
      >
        <Dialog.Title
          title={t("GroupCreatedDialog:group-created")}
          titleStyle={styles.dialogTitle}
        />
        <Text>{t("GroupCreatedDialog:group-created-description")}</Text>
        <Dialog.Actions>
          <Dialog.Button
            title={t("GroupCreatedDialog:create-user")}
            onPress={onSubmit}
          />
        </Dialog.Actions>
      </Dialog>
    );
  },
);

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  overlay: {
    backgroundColor: theme.colors.modal,
  },
}));

GroupCreatedDialog.displayName = "GroupCreatedDialog";

export default GroupCreatedDialog;
