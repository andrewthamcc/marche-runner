import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";

// react components
import Button, { buttonColor } from "../../Button";

require("./style.scss");

interface Props {
  children?: any;
  close: () => void; // prop to close modal from parent
  confirm: () => void; // function to execute when confirmed
  isModalOpen: boolean; // boolean to determine to display modal or not
  text?: string; // body text
  title: string; // title text
}

const ConfirmationModal: React.FC<Props> = (props: Props) => {
  // props
  const { isModalOpen, confirm, close, text, title } = props;

  // other hooks
  const node = useRef(null);

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const handleOutsideClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }

    close();
  };

  const renderModal = () => {
    return (
      <div className="confirmation-modal">
        <div className="confirmation-modal-container" ref={node}>
          <h2 className="confirmation-modal-title">{title}</h2>
          <span className="confirmation-modal-text">{text}</span>
          {props.children}

          <div className="confirmation-modal-controls">
            <Button color={buttonColor.green} onClick={() => confirm()}>
              Confirm
            </Button>
            <Button onClick={() => close()}>Cancel</Button>
          </div>
        </div>
      </div>
    );
  };

  const portalRoot: Element = document.querySelector("#portal-root");

  return isModalOpen && ReactDOM.createPortal(renderModal(), portalRoot);
};

ConfirmationModal.defaultProps = {
  isModalOpen: false,
};

export default ConfirmationModal;
