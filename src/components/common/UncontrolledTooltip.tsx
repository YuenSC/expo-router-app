import { Tooltip, TooltipProps } from "@rneui/themed";
import { memo, PropsWithChildren } from "react";

import { useDisclosure } from "@/src/hooks/useDisclosure";

type IUncontrolledTooltipProps = PropsWithChildren<TooltipProps>;

const UncontrolledTooltip = memo<IUncontrolledTooltipProps>((props) => {
  const { isVisible, onOpen, onClose } = useDisclosure();
  return (
    <Tooltip {...props} visible={isVisible} onOpen={onOpen} onClose={onClose} />
  );
});

UncontrolledTooltip.displayName = "UncontrolledTooltip";

export default UncontrolledTooltip;
