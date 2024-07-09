import { Dialog, Text } from "@rneui/themed";
import * as Network from "expo-network";
import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useDisclosure } from "../hooks/useDisclosure";

type INetworkDialogProps = object;

const NetworkDialog = memo<INetworkDialogProps>(() => {
  const { isVisible, onClose, onOpen } = useDisclosure();
  const [isInternetReachable, setIsInternetReachable] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const { t } = useTranslation();

  const getNetworkInfo = useCallback(async () => {
    setIsLoading(true); // Start loading
    const network = await Network.getNetworkStateAsync();
    setIsInternetReachable(network.isInternetReachable || false);
    setIsLoading(false); // End loading
  }, []);

  useEffect(() => {
    getNetworkInfo();
  }, [getNetworkInfo]);

  useEffect(() => {
    if (!isInternetReachable) {
      onOpen();
    } else {
      onClose();
    }
  }, [isInternetReachable, onOpen, onClose]);

  return (
    <Dialog isVisible={isVisible}>
      <Dialog.Title title={t("NetworkDialog:network-connection-down")} />
      <Text>
        {t("NetworkDialog:please-check-your-network-connection-and-try-again")}
      </Text>
      <Dialog.Actions>
        <Dialog.Button
          title="Try Again"
          onPress={getNetworkInfo}
          loading={isLoading}
        />
      </Dialog.Actions>
    </Dialog>
  );
});

NetworkDialog.displayName = "NetworkDialog";

export default NetworkDialog;
