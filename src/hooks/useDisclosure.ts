import { useState } from "react";

export const useDisclosure = (defaultIsVisible?: boolean) => {
  const [isVisible, setIsVisible] = useState(defaultIsVisible || false);

  const onOpen = () => {
    setIsVisible(true);
  };

  const onClose = () => {
    setIsVisible(false);
  };

  const onToggle = () => {
    setIsVisible((prev) => !prev);
  };

  return {
    isVisible,
    onOpen,
    onClose,
    onToggle,
  };
};
