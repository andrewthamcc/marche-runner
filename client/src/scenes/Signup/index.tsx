import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { AppState } from "../../reducers";

// components
import LoadingSpinner from "../../components/Loader";
import TextInput, { textInputType } from "../../components/TextInput";
import Button, { buttonColor } from "../../components/Button";

// redux actions
import { clearErrors, registerUser } from "../../actions/auth";

// models
import { RegisterFormData } from "../../models/user";

require("./style.scss");

interface OwnProps {}

interface ReduxStateProps {
  error: any;
  loading: boolean;
  isAuthenticated: boolean;
}

interface ReduxDispatchProps {
  clearErrors: () => void;
  registerUser: (data: RegisterFormData) => void;
}

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const Signup: React.FC<Props> = (props: Props): JSX.Element => {
  // state
  const [formData, setFormData] = useState<SignUpData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // props
  const { clearErrors, error, loading, registerUser } = props;

  // other hooks
  const history = useHistory();

  useEffect(() => {
    // if user is authenticated redirect to dashboard
    if (props.isAuthenticated) {
      history.push("/dashboard");
    }
  }, [props, history]);

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (error) {
      clearErrors();
    }

    const { firstName, lastName, email, password } = formData;

    if (!firstName || !lastName || !email || !password) {
      return;
    }

    const data: RegisterFormData = { firstName, lastName, email, password };
    registerUser(data);

    // clear form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  const renderForm = () => {
    return (
      <>
        <h2 className="signup-form-title">
          Sign up with <span>MarchéRunner</span>
        </h2>
        <form className="signup-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="signup-form-name">
            <TextInput
              label="First Name"
              placeholder="Jane"
              inputID="signup-firstname"
              inputName="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange(e)}
              required
              className="signup-form-name-first"
            />
            <TextInput
              label="Last Name"
              placeholder="Smith"
              inputID="signup-lastname"
              inputName="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange(e)}
              required
              className="signup-form-name-last"
            />
          </div>
          <TextInput
            label="Email Address"
            placeholder="example@example.com"
            type={textInputType.email}
            inputID="signup-email"
            inputName="email"
            value={formData.email}
            onChange={(e) => handleChange(e)}
            required
            className="signup-form-input"
          />
          <TextInput
            label="Password"
            type={textInputType.password}
            inputID="signup-password"
            inputName="password"
            value={formData.password}
            onChange={(e) => handleChange(e)}
            required
            className="signup-form-input"
          />
          <Button
            color={buttonColor.green}
            border={false}
            className={"signup-form-button"}
            disabled={
              !formData.firstName ||
              !formData.lastName ||
              !formData.email ||
              !formData.password
            }
          >
            Sign Up
          </Button>
          {error && (
            <p className="signup-error">An unexpected error occured.</p>
          )}
        </form>
      </>
    );
  };

  return (
    <div className="signup">
      <div className="signup-left">
        <div className="container flex-container">
          <h2>MarchéRunner</h2>
          <p>
            MarchéRunner is a web application for helping with your grocery
            runs.
          </p>
        </div>
      </div>
      <div className={`signup-right ${loading ? "loading" : ""}`}>
        {loading ? <LoadingSpinner /> : renderForm()}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  error: state.authState.error,
  loading: state.authState.loading,
  isAuthenticated: state.authState.isAuthenticated,
});

export default connect(mapStateToProps, { clearErrors, registerUser })(Signup);
