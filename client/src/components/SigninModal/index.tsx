import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

// components
import LoadingSpinner from "../Loader";
import TextInput, { textInputType } from "../TextInput";
import Button, { buttonColor } from "../Button";

// redux actions
import { loginUser } from "../../actions/auth";

require("./style.scss");

interface OwnProps {
  isModalOpen: boolean; // boolean to determine to display modal or not
  close: () => void; // prop to close modal from parent
  children?: any;
}

interface ReduxStateProps {
  loading: boolean;
  isAuthenticated: boolean;
}

interface ReduxDispatchProps {
  loginUser: (data) => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

// gets the root for the portal to append to
const portalRoot = document.querySelector("#portal-root");

interface SignInData {
  email: string;
  password: string;
}

const SigninModal: React.FC<Props> = (props: Props) => {
  const [formData, setFormData] = useState<SignInData>({
    email: "",
    password: "",
  });
  const history = useHistory();
  const node = useRef(null);
  const { isModalOpen, close, loading } = props;

  useEffect(() => {
    // if user is authenticated redirect to dashboard
    if (props.isAuthenticated) {
      history.push("/dashboard");
      close();
    }

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { loginUser } = props;
    const { email, password } = formData;

    if (!email || !password) {
      return;
    }

    const data = { email, password };
    loginUser(data);

    // clear form
    setFormData({ email: "", password: "" });
  };

  const renderModal = () => {
    if (loading) {
      return (
        <div className="signin">
          <div className="signin-container" ref={node}>
            <LoadingSpinner />
          </div>
        </div>
      );
    }

    return (
      <div className="signin">
        <div className="signin-container" ref={node}>
          <h2 className="signin-title">Sign In</h2>

          <form onSubmit={handleSubmit} className="signin-form">
            <TextInput
              type={textInputType.email}
              value={formData.email}
              onChange={(e) => handleChange(e)}
              placeholder="Email"
              label="Email Address"
              inputID="sign-in-email"
              inputName="email"
            />
            <TextInput
              value={formData.password}
              onChange={(e) => handleChange(e)}
              placeholder="Password"
              label="Password"
              inputID="sign-in-password"
              inputName="password"
              type={textInputType.password}
            />
            <Button
              color={buttonColor.orange}
              disabled={!formData.email || !formData.password}
            >
              Sign In
            </Button>
          </form>

          <p className="signin-signup">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    );
  };

  return isModalOpen && ReactDOM.createPortal(renderModal(), portalRoot);
};

SigninModal.defaultProps = {
  isModalOpen: false,
};

const mapStateToProps = (state) => ({
  loading: state.authState.loading,
  isAuthenticated: state.authState.isAuthenticated,
});

export default connect(mapStateToProps, { loginUser })(SigninModal);
