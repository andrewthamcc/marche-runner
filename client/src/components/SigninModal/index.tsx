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
import { clearErrors, loginUser } from "../../actions/auth";

// models
import { LoginFormData } from "../../models/user";

require("./style.scss");

interface OwnProps {
  close: () => void; // prop to close modal from parent
  children?: any;
  isModalOpen: boolean; // boolean to determine to display modal or not
}

interface ReduxStateProps {
  error: any;
  isAuthenticated: boolean;
  loading: boolean;
}

interface ReduxDispatchProps {
  clearErrors: () => void;
  loginUser: (data: LoginFormData) => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

interface SignInData {
  email: string;
  password: string;
}

const SigninModal: React.FC<Props> = (props: Props) => {
  // state
  const [formData, setFormData] = useState<SignInData>({
    email: "",
    password: "",
  });

  // props
  const {
    clearErrors,
    close,
    error,
    isAuthenticated,
    isModalOpen,
    loading,
  } = props;

  // other hooks
  const history = useHistory();
  const signinModal = useRef(null); // modal ref
  const signinForm = useRef<HTMLFormElement>(null); // input ref

  useEffect(() => {
    // if user is authenticated redirect to dashboard
    if (isAuthenticated) {
      history.push("/dashboard");
      close();
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);

      if (signinForm.current) {
        signinForm.current.focus();
      }
    }

    function handleOutsideClick(e) {
      if (signinModal.current.contains(e.target)) {
        return;
      }

      if (error) {
        clearErrors();
      }

      close();
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isAuthenticated, clearErrors, close, error, history, isModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error) {
      clearErrors();
    }

    const { loginUser } = props;
    const { email, password } = formData;

    if (!email || !password) {
      return;
    }

    const data: LoginFormData = { email, password };
    loginUser(data);

    // clear form
    setFormData({ email: "", password: "" });
  };

  const renderError = () => {
    const { status } = error;
    let message = "";

    if (status === 401) {
      message = "Invalid Credentials.";
    } else if (status === 500) {
      message = "An unexpected error occured.";
    }

    return <p className="signin-error">{message}</p>;
  };

  const renderModal = () => {
    if (loading) {
      return (
        <div className="signin">
          <div className="signin-container" ref={signinModal}>
            <LoadingSpinner />
          </div>
        </div>
      );
    }

    return (
      <div className="signin">
        <div className="signin-container" ref={signinModal}>
          <h2 className="signin-title">Sign In</h2>

          <form
            onSubmit={handleSubmit}
            className="signin-form"
            ref={signinForm}
            tabIndex={-1}
          >
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
            {error && renderError()}
          </form>
          <p className="signin-signup">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    );
  };

  // gets the root for the portal to append to
  const portalRoot: Element = document.querySelector("#portal-root");

  return isModalOpen && ReactDOM.createPortal(renderModal(), portalRoot);
};

SigninModal.defaultProps = {
  isModalOpen: false,
};

const mapStateToProps = (state) => ({
  error: state.authState.error,
  loading: state.authState.loading,
  isAuthenticated: state.authState.isAuthenticated,
});

export default connect(mapStateToProps, { clearErrors, loginUser })(
  SigninModal
);
