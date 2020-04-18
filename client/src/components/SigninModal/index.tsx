import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

// components
import TextInput, { textInputType } from "../TextInput";
import Button, { buttonColor } from "../Button";

require("./style.scss");

interface Props {
  isModalOpen: boolean; // boolean to determine to display modal or not
  close: () => void; // prop to close modal from parent
  children?: any;
}

// gets the root for the portal to append to
const portalRoot = document.querySelector("#portal-root");

const SigninModal: React.FC<Props> = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const node = useRef(null);
  const { isModalOpen, close } = props;

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const renderModal = (
    <div className={"signin"}>
      <div className="signin-container" ref={node}>
        <h2 className="signin-title">Sign In</h2>

        <form onSubmit={handleSubmit} className="signin-form">
          <TextInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            inputName="sign-in-email"
            label="Email Address"
          />
          <TextInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            inputName="sign-in-password"
            type={textInputType.password}
            label="Password"
          />
          <Button color={buttonColor.orange} disabled={!email || !password}>
            Sign In
          </Button>
        </form>

        <p className="signin-signup">Don't have an account? Sign Up</p>
      </div>
    </div>
  );

  return isModalOpen && ReactDOM.createPortal(renderModal, portalRoot);
};

SigninModal.defaultProps = {
  isModalOpen: false,
};

export default SigninModal;
