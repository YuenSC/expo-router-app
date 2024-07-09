import { Dialog, Text } from "@rneui/themed";
import { memo } from "react";
import { useTranslation } from "react-i18next";

type IGroupCreatedDialogProps = {
  onClose: () => void;
  onSubmit: () => void;
  isVisible: boolean;
};

const GroupCreatedDialog = memo<IGroupCreatedDialogProps>(
  ({ onClose, isVisible, onSubmit }) => {
    const { t } = useTranslation();

    return (
      <Dialog isVisible={isVisible} onBackdropPress={onClose}>
        <Dialog.Title title={t("GroupCreatedDialog:group-created")} />
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

GroupCreatedDialog.displayName = "GroupCreatedDialog";

export default GroupCreatedDialog;
