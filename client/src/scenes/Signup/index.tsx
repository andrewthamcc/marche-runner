import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

// components
import TextInput, { textInputType } from "../../components/TextInput";
import Button, { buttonColor } from "../../components/Button";

// redux actions
import { registerUser } from "../../actions/user";

require("./style.scss");

interface OwnProps {}

interface ReduxStateProps {}

interface ReduxDispatchProps {
  registerUser: (data) => void;
}

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const Signup: React.FC<Props> = (props: Props): JSX.Element => {
  const [formData, setFormData] = useState<SignUpData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = formData;
    const { registerUser } = props;

    if (!firstName || !lastName || !email || !password) {
      return;
    }

    const data = { firstName, lastName, email, password };
    registerUser(data);

    // clear form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="signup">
      <div className="signup-left">
        <div className="container flex-container">
          <h2>marchéRunner</h2>
          <p>
            marchéRunner is a web application for helping with your grocery
            runs.
          </p>
        </div>
      </div>
      <div className="signup-right">
        <h2 className="signup-form-title">
          Sign up with <span>marchéRunner</span>!
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
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { registerUser })(Signup);
