import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

interface Props {
  toggleModal: () => void;
  open: boolean;
  children: React.ReactNode;
  modalTitle?: string;
  style?: React.CSSProperties;
  className?: string;
}
const CustomModal = (props: Props) => {
  const { open, toggleModal, children, modalTitle, style, className } = props;
  return (
    <Modal
      styles={{ modal: style ?? { minWidth: "200px" } }}
      classNames={{ modal: `rounded-md ${className || ""}` }}
      open={open}
      onClose={toggleModal}
      center
    >
      {modalTitle && <h1 className="text-lg font-semibold">{modalTitle}</h1>}
      {children}
    </Modal>
  );
};

export default CustomModal;
