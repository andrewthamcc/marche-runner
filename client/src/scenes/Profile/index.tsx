import React from "react";
import { connect } from "react-redux";

// components
import Button from "../../components/Button";
import TextInput, { textInputType } from "../../components/TextInput";

// models
import { UserModel } from "../../models/user";

require("./style.scss");

interface OwnProps {}

interface ReduxStateProps {
  user: UserModel;
}

interface ReduxDispatchProps {}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const Profile: React.FC<Props> = (props: Props): JSX.Element => {
  const { firstName, lastName, email } = props.user;

  return (
    <div className="profile">
      <h2>Profile</h2>
      FirstName: {firstName}
      FirstName: {lastName}
      Email: {email}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: {
    firstName: state.authState.firstName,
    lastName: state.authState.lastName,
    email: state.authState.email,
  },
});

export default connect(mapStateToProps, {})(Profile);
