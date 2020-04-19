import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { History } from "history";

// components
import TextInput, { textInputType } from "../../components/TextInput";
import Button, { buttonColor } from "../../components/Button";

// redux actions
import { registerUser } from "../../actions/user";

require("./style.scss");

interface OwnProps {
  history: History;
}

interface ReduxStateProps {}

interface ReduxDispatchProps {
  registerUser: (data) => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const Signup: React.FC<Props> = (props: Props): JSX.Element => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { registerUser } = props;

    if (!firstName || !lastName || !email || !password) {
      return;
    }

    const data = { firstName, lastName, email, password };
    registerUser(data);

    // clear form
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");

    // props.history.replace("/dashboard");
  };

  return (
    <div className="signup">
      <div className="signup-left">
        <div className="container flex-container">
          <h2>shopRunner</h2>
          <p>
            shopRunner is a web application for helping with your grocery runs.
          </p>
        </div>
      </div>
      <div className="signup-right">
        <h2 className="signup-form-title">
          Sign up with <span>shopRunner</span>!
        </h2>
        <form className="signup-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="signup-form-name">
            <TextInput
              label="First Name"
              placeholder="Jane"
              inputName="signup-firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="signup-form-name-first"
            />
            <TextInput
              label="Last Name"
              placeholder="Smith"
              inputName="signup-lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="signup-form-name-last"
            />
          </div>
          <TextInput
            label="Email Address"
            placeholder="example@example.com"
            inputName="signup-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-form-input"
          />
          <TextInput
            label="Password"
            type={textInputType.password}
            inputName="signup-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signup-form-input"
          />
          <Button
            color={buttonColor.green}
            border={false}
            className={"signup-form-button"}
            disabled={!firstName || !lastName || !email || !password}
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
