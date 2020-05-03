import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";

require("./style.scss");

interface Props {
  children?: any;
  className?: string;
  close: () => void; // prop to close modal from parent
  isModalOpen: boolean; // boolean to determine to display modal or not
}

const BlankModal: React.FC<Props> = (props: Props): JSX.Element => {
  // props
  const { className, close, isModalOpen } = props;

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
      <div className={`blank-modal ${className ? className : ""}`}>
        <div className="blank-modal-container" ref={node}>
          {props.children}
        </div>
      </div>
    );
  };

  const portalRoot: Element = document.querySelector("#portal-root");

  return isModalOpen && ReactDOM.createPortal(renderModal(), portalRoot);
};

BlankModal.defaultProps = {
  isModalOpen: false,
};

export default BlankModal;
