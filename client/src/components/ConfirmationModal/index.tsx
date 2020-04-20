import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";

// react components
import Button, { buttonColor } from "../../components/Button";

require("./style.scss");

interface OwnProps {
  isModalOpen: boolean; // boolean to determine to display modal or not
  close: () => void; // prop to close modal from parent
  confirm: () => void; // function to execute when confirmed
  title: string; // title text
  text?: string; // body text
  children?: any;
}

interface ReduxStateProps {}

interface ReduxDispatchProps {}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

// gets the root for the portal to append to
const portalRoot = document.querySelector("#portal-root");

const ConfirmationModal: React.FC<Props> = (props: Props) => {
  const node = useRef(null);
  const { isModalOpen, close, title, text, confirm } = props;

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

  return isModalOpen && ReactDOM.createPortal(renderModal(), portalRoot);
};

ConfirmationModal.defaultProps = {
  isModalOpen: false,
};

export default ConfirmationModal;
