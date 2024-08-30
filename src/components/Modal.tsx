import React from "react";
import "react-responsive-modal/styles.css";
import { Modal as CustomModal } from "react-responsive-modal";

type Props = {
  toggleModal: () => void;
  open: boolean;
  children: React.ReactNode;
  modalTitle?: string;
  style?: React.CSSProperties;
  className?: string;
};
//TODO: remove with shad/cn dialog
const Modal = (props: Props) => {
  const { open, toggleModal, children, modalTitle, style, className } = props;
  return (
    <CustomModal
      styles={{ modal: style ?? { minWidth: "200px" } }}
      classNames={{ modal: `rounded-md ${className || ""}` }}
      open={open}
      onClose={toggleModal}
      center
    >
      {modalTitle && <h1 className="text-xl font-semibold">{modalTitle}</h1>}
      {children}
    </CustomModal>
  );
};

export default Modal;
